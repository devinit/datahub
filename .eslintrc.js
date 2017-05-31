const path = require('path');

module.exports = {
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  plugins: ['react', 'jsx-a11y', 'flowtype-errors', 'flowtype', 'import'],
  env: {
    browser: true,
    jest: true,
    node: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['node_modules', path.resolve(__dirname, 'private'), path.resolve(__dirname, 'public/semantic')],
          },
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
    'no-constant-condition': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'no-console': 0,
    'no-tabs': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'flowtype-errors/show-errors': 2,
    'flowtype-errors/enforce-min-coverage': [2, 30],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx']
      }
    ]
  }
};
