const path = require('path');
const webpack = require('webpack');
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


const newRules = [
  {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      include: [
          SRC_PATH,
      ]
  }
]
const newExtensions =  ['.ts', '.tsx', '.js', '.jsx'];

const newPlugins = [
  new webpack.DefinePlugin({
    'process.browser': true,
    'process.storybook': true
  })
];


module.exports = (config, env) => {
  const webpack = genDefaultConfig(config, env);
  const plugins = webpack.plugins.concat(newPlugins);
  const rules = webpack.module.rules.concat(newRules);
  const module = Object.assign(webpack.module, {rules})
  const extensions = webpack.resolve.extensions.concat(newExtensions);
  const resolve = Object.assign(webpack.resolve, {extensions, enforceExtension: false})
  return Object.assign(webpack, {resolve}, { module }), {plugins});
};
