import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.ts',
    pool: 'forks',
    retry: 3,
    testTimeout: 5000000,
    isolate: true,
    coverage: {
      exclude: [
        'coverage/*',
        'codegen.ts',
        '.yarn/*',
        'src/babel-plugin-macros.config.js',
        'src/apollo-upload-client.d.ts',
        'src/vite-env.d.ts',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/index.tsx',
        'src/i18.ts',
        'src/apolloConfig.tsx',
        'src/__generated__/fragment-masking.ts',
        'src/__generated__/index.ts',
        'src/Routes/Routes.Redirect.notest.jsx',
        '.eslintrc.cjs',
      ],
    },
  },
});
