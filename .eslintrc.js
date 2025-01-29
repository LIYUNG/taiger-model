module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {},
  plugins: ['@typescript-eslint', 'prettier']
};
