module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: [
    'standard',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': 'error'
  }
};
