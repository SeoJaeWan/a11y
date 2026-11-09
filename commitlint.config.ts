import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const HANGUL = /[ㄱ-힝]/u;

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'header-english': ({ header }) => [
          !HANGUL.test(header ?? ''),
          'write the commit title in English (the body can be Korean)',
        ],
      },
    },
  ],
  rules: {
    'header-english': [RuleConfigSeverity.Error, 'always'],
  },
};

export default config;
