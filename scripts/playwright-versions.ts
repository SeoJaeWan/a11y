// Lists the Playwright versions the scenario jobs run with, as a GitHub Actions matrix.
// Runs with Node's type stripping, so it uses only Node built-ins and type-only imports.
import { appendFileSync, readFileSync } from 'node:fs';

type VersionEntry = { version: string; label: string; isBeta: boolean; isPinned: boolean };
type PackageJson = {
  peerDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};
type Registry = { 'dist-tags': Record<string, string>; versions: Record<string, unknown> };

const PACKAGE = '@playwright/test';

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as PackageJson;
const pinned = pkg.devDependencies[PACKAGE] ?? '';
const lowerBound = /^>=(\d+)\.(\d+)/.exec(pkg.peerDependencies[PACKAGE] ?? '');
if (!lowerBound) throw new Error(`Cannot read the lower bound of ${PACKAGE} in peerDependencies`);
const minMinor = Number(lowerBound[2]);

const requested = process.env.PLAYWRIGHT_VERSION?.trim();
const entries = requested ? [entry(requested)] : await supportedVersions();

const matrix = JSON.stringify({ include: entries });
console.log(matrix);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${matrix}\n`);

/** Latest patch of every minor from the lower bound to the latest release, plus a newer beta. */
async function supportedVersions(): Promise<VersionEntry[]> {
  const response = await fetch(`https://registry.npmjs.org/${PACKAGE}`);
  if (!response.ok) throw new Error(`npm registry answered ${String(response.status)}`);
  const registry = (await response.json()) as Registry;
  const latest = registry['dist-tags'].latest ?? '';
  const latestMinor = Number(latest.split('.')[1]);
  const byMinor = new Map<number, string>();
  for (const version of Object.keys(registry.versions)) {
    const match = /^1\.(\d+)\.(\d+)$/.exec(version);
    if (!match) continue;
    const minor = Number(match[1]);
    if (minor < minMinor || minor > latestMinor) continue;
    const current = byMinor.get(minor);
    if (!current || Number(match[2]) > Number(current.split('.')[2])) byMinor.set(minor, version);
  }
  const versions = [...byMinor.entries()].sort(([a], [b]) => a - b).map(([, version]) => version);
  const result = versions.map((version) => entry(version));
  const beta = registry['dist-tags'].beta;
  if (beta && Number(beta.split('.')[1]) > latestMinor) result.push(entry(beta));
  return result;
}

/**
 * Describes one version for the matrix.
 * @param version Exact npm version.
 */
function entry(version: string): VersionEntry {
  const isBeta = version.includes('-');
  const label = isBeta ? `${version.split('.').slice(0, 2).join('.')} beta` : version;
  return { version, label, isBeta, isPinned: version === pinned };
}
