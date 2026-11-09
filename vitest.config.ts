import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'test/runner/**/*.test.ts'],
    passWithNoTests: true,
  },
});
