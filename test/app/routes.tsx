import type { ComponentType } from 'react';

type PageModule = { Page: ComponentType };

const PAGES = import.meta.glob<PageModule>(['./pieces/**/*.tsx', './cases/**/*.tsx']);

/**
 * Finds the case page for a URL. `/cases/reach/plain-button` loads `./cases/reach/plain-button.tsx`.
 * @param pathname URL path of the case page.
 */
export async function resolvePage(pathname: string): Promise<ComponentType | undefined> {
  const load = PAGES[`.${pathname.replace(/\/$/, '')}.tsx`];
  if (!load) return undefined;
  const module = await load();
  return module.Page;
}

/** Shown when no case page matches the URL. */
export function PageNotFound(): React.JSX.Element {
  return (
    <main>
      <h1>Page not found</h1>
      <ul>
        {Object.keys(PAGES).map((path) => {
          const url = path.slice(1).replace(/\.tsx$/, '');
          return (
            <li key={url}>
              <a href={url}>{url}</a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
