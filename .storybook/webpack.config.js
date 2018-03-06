const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const packageJSON = require('../package.json');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC_PATH = path.join(__dirname, '../src');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


const newRules = [
  {
      test: /\.(ts|tsx)(\?[^?]*)?$/,
      loader: 'happypack/loader?id=ts',
      options: {
        transpileOnly: true 
      },
      include: [
          SRC_PATH
      ]
  }
]

const newExtensions =  ['.ts', '.tsx'];

const newPlugins = [
  new webpack.DefinePlugin({
    'process.browser': true,
    'APP_VERSION': JSON.stringify(packageJSON.version),
    'API': JSON.stringify(packageJSON.config.API),
    'OLD_DATAHUB_URL': JSON.stringify(packageJSON.config.OLD_DATAHUB_URL)
  }),
  new HappyPack({
    id: 'ts',
    threads: 3,
    loaders: [
        {
            path: 'ts-loader',
            query: { happyPackMode: true }
        }
    ]
  }),
  new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
];


module.exports = (oldConfig, env) => {
  const config = genDefaultConfig(oldConfig, env);
  const plugins = config.plugins.concat(newPlugins);
  const rules = config.module.rules.concat(newRules);
  const module = Object.assign(config.module, {rules})
  const extensions = config.resolve.extensions.concat(newExtensions);
  const resolve = Object.assign(config.resolve, {extensions, enforceExtension: false})
  return Object.assign(config, {resolve}, { module }, {plugins});
};
