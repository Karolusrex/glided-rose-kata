module.exports = {
    parser: 'babel-eslint',
    root: true,
    plugins: ['prettier'],
    env: {
      node: true,
      mocha: true
    },
    extends: ['airbnb-base', 'prettier'],
    rules: {
    'no-nested-ternary': 'off',
    'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 120
        }
      ]
    }
  };
  