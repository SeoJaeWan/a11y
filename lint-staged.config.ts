import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*.{ts,tsx}': 'eslint --fix --max-warnings=0',
  '*': 'prettier --write --ignore-unknown',
};

export default config;
