const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  plugins: ['flowtype', 'react', 'jsx-a11y', 'import', 'graphql'],
  globals: {
    loadCSS: true
  },
  env: {
    browser: true,
    jest: true,
    node: true
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        'extensions': ['.js', '.graphql', '.jsx', '.gql'],
        'root': ['private', 'public/semantic', 'public/img'],
        'alias': {
          "package.json": "./package.json"
        }
      }
    }
  },
  rules: {
    'no-shadow': 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'global-require': 0,
    'object-curly-spacing': 0,
    'no-unused-expressions': 0,
    'no-confusing-arrow': 0,
    'no-unused-vars': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'no-constant-condition': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-array-index-key': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 2,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'graphql/template-strings': ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'literal'
      env: 'literal',
      // Import your schema JSON here
      schemaJson: require('./schema.json'),
    }]
  }
};
