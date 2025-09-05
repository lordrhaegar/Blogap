module.exports = {
    env: {
    node: true,
  },
    // parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
