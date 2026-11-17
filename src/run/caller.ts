import { fileURLToPath } from 'node:url';

/** A place in the user's test code. */
export type Caller = { file: string; line: number; column: number };

// `at fn (file:line:column)` or `at file:line:column`; the file may be a `file://` URL or a Windows path.
const FRAME = /^at (?:.*? \()?((?:file:\/\/\/?)?(?:[A-Za-z]:)?[^():]+):(\d+):(\d+)\)?$/;

/**
 * Keeps the stack lines that belong to the user's code: not this package, not dependencies,
 * not Node itself.
 * @param stack Stack of an error created inside an intercepted action.
 * @param ownDir Folder of this package's code.
 */
export function userFrames(stack: string, ownDir: string): string[] {
  return stack
    .split('\n')
    .filter((line) => line.trimStart().startsWith('at '))
    .filter((line) => !line.includes('node_modules') && !line.includes('node:'))
    .filter((line) => !toPath(line).startsWith(ownDir));
}

/**
 * Finds the line of the user's code that called the action.
 * @param stack Stack of an error created inside an intercepted action.
 * @param ownDir Folder of this package's code.
 */
export function findCaller(stack: string, ownDir: string): Caller | undefined {
  const [first] = userFrames(stack, ownDir);
  const match = first === undefined ? null : FRAME.exec(first.trim());
  if (!match) return undefined;
  const [, file = '', line = '0', column = '0'] = match;
  return { file: normalize(file), line: Number(line), column: Number(column) };
}

/**
 * Reads the file path of one stack line, or an empty string when it has none.
 * @param line One `at ...` line of a stack.
 */
function toPath(line: string): string {
  const match = FRAME.exec(line.trim());
  return match?.[1] === undefined ? '' : normalize(match[1]);
}

/**
 * Turns a `file://` URL into a plain path.
 * @param file Path or `file://` URL from a stack line.
 */
function normalize(file: string): string {
  return file.startsWith('file:') ? fileURLToPath(file) : file;
}
