module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  settings: {},
  extends: ['airbnb-base', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'never', { js: 'always' }],
    'import/order': [
      'error',
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'express*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: './socket/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../socket/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: './routes/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../controllers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../service/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../utils/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        // distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
