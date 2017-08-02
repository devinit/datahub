const path = require('path');
const webpack = require('webpack');
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


const moduleResolver = {
  resolve: {
    modules: ['node_modules',
      path.resolve(__dirname, 'private'),
      path.resolve(__dirname, 'public/semantic'),
      path.resolve(__dirname, 'public/di-charts'),
      path.resolve(__dirname, 'public/img')
    ],
    alias: {
      'package.json': './package.json'
    }
  }
};

const newPlugins = [
  new webpack.EnvironmentPlugin(['MapboxAccessToken']),
  new webpack.DefinePlugin({
    'process.browser': true
  })
];

module.exports = (config, env) => {
  const webpack = genDefaultConfig(config, env);
  const plugins = webpack.plugins.concat(newPlugins);
  return Object.assign(webpack, moduleResolver, {
    plugins
  });
};
