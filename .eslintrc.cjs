module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist', 
    '.eslintrc.cjs', 
    'vitest.config.ts', 
    'vite.config.ts', 
    'codegen.ts', 
    '__generated__', 
    'node_modules'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': [
      'off'
    ],
    '@typescript-eslint/no-floating-promises': [
      'off'
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};