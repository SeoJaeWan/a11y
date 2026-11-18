import { describe, expect, it } from 'vitest';

import { hasTestTitle, readAlternativeTitle } from './alternative';

const SOURCE = [
  "import { test } from '@playwright/test';",
  '',
  '// a11y-alternative: 버튼으로 카드를 옮긴다',
  "test('카드를 끌어 옮긴다', async () => {});",
  '',
  "test('버튼으로 카드를 옮긴다', async () => {});",
].join('\n');

describe('readAlternativeTitle', () => {
  it('reads the title from the comment right above the test', () => {
    expect(readAlternativeTitle(SOURCE, 4)).toBe('버튼으로 카드를 옮긴다');
  });

  it('gives nothing for a test without the comment', () => {
    expect(readAlternativeTitle(SOURCE, 6)).toBeUndefined();
  });

  it('reads a file with Windows line ends', () => {
    expect(readAlternativeTitle(SOURCE.replaceAll('\n', '\r\n'), 4)).toBe('버튼으로 카드를 옮긴다');
  });
});

describe('hasTestTitle', () => {
  it('finds a title written as a string in a test file', () => {
    expect(hasTestTitle([SOURCE], '버튼으로 카드를 옮긴다')).toBe(true);
  });

  it('does not count the comment that points at the title', () => {
    expect(
      hasTestTitle([SOURCE.split('\n').slice(0, 4).join('\n')], '버튼으로 카드를 옮긴다'),
    ).toBe(false);
  });
});
