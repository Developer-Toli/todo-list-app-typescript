module.exports = {
  // commonjs
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  overrides: [
    // eslint config darj bichij shine config uusgej bolno
    {
      files: ['vite.config.ts'],
      env: {
        node: true
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Eslint Durmuud
    /* 
      @Typescript-eslint
    */
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowString: false,
        allowNumber: false
      }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-call': 'off',
    /* 
    Eslint common
    */
    'template-curly-spacing': ['error', 'never'],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true
      }
    ],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': [
      'error',
      'never',
      {
        enforceForClassMembers: true
      }
    ],
    'no-console': ['warn', { allow: ['error'] }],
    'no-unused-vars': ['error', { caughtErrors: 'all', caughtErrorsIgnorePattern: '^ignore' }],
    'no-undef': 'error',
    'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    curly: ['error', 'all'],
    semi: ['error', 'always'], // ;
    quotes: [
      // ''
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'quote-props': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-double'],
    'max-len': [
      'warn',
      {
        code: 150,
        tabWidth: 2
      }
    ],
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: true,
        skipBlankLines: true
      }
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
        MemberExpression: 1
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ]
  }
};
