import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import checkFile from 'eslint-plugin-check-file';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const NO_DEFAULT_EXPORT = {
  selector: 'ExportDefaultDeclaration',
  message: 'Use named exports only.',
};
const NO_INLINE_TYPE_IMPORT = {
  selector: "ImportSpecifier[importKind='type']",
  message: "Import types with a separate 'import type' statement.",
};
const NO_INTERNAL_ACCESS = [
  {
    selector: 'MemberExpression[property.name=/^_/]',
    message: 'Access Playwright internals only in src/playwright-internal/.',
  },
  {
    selector: "MemberExpression[property.name='prototype']",
    message: 'Access prototypes only in src/playwright-internal/.',
  },
];

export default defineConfig(
  {
    ignores: ['dist/', 'node_modules/', '.codocs/', 'test-results/', 'playwright-report/'],
  },
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  jsdoc.configs['flat/recommended-typescript-error'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'check-file': checkFile,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid' },
        { selector: 'variable', modifiers: ['const'], format: ['camelCase', 'UPPER_CASE'] },
        {
          selector: ['variable', 'parameter'],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'can', 'should'],
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'import', format: null },
        { selector: 'variable', modifiers: ['destructured'], format: null },
        // Object keys often follow outside shapes (configs, headers, ARIA).
        { selector: ['objectLiteralProperty', 'objectLiteralMethod'], format: null },
        { selector: 'typeProperty', modifiers: ['requiresQuotes'], format: null },
      ],
      'func-style': ['error', 'declaration'],
      'no-restricted-syntax': [
        'error',
        NO_DEFAULT_EXPORT,
        NO_INLINE_TYPE_IMPORT,
        ...NO_INTERNAL_ACCESS,
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { '{src,test}/**/': 'KEBAB_CASE' }],
      'check-file/filename-blocklist': [
        'error',
        {
          '**/{utils,util,helpers,helper,common,misc}.{ts,tsx}': '*.{ts,tsx}',
          '**/index.{ts,tsx}': '*.{ts,tsx}',
        },
      ],
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: false,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-description': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns': 'off',
    },
  },
  {
    // The package entry point is the only allowed index file.
    files: ['src/index.ts'],
    rules: {
      'check-file/filename-blocklist': [
        'error',
        { '**/{utils,util,helpers,helper,common,misc}.{ts,tsx}': '*.{ts,tsx}' },
      ],
    },
  },
  {
    files: ['src/playwright-internal/**/*.ts'],
    rules: {
      'no-restricted-syntax': ['error', NO_DEFAULT_EXPORT, NO_INLINE_TYPE_IMPORT],
    },
  },
  {
    // Tool config files must use a default export.
    files: ['*.config.ts', 'test/**/*.config.ts'],
    rules: {
      'no-restricted-syntax': ['error', NO_INLINE_TYPE_IMPORT, ...NO_INTERNAL_ACCESS],
    },
  },
  {
    files: ['test/e2e/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^(?!@playwright/test$)',
              message: 'E2E files are plain Playwright tests: import only @playwright/test.',
            },
          ],
        },
      ],
    },
  },
);
