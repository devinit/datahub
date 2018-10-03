const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const packageJSON = require('./package.json');
const { ANALYZE } = process.env;
const API = process.env.API || packageJSON.config.API;

module.exports = withTypescript({
  webpack(config, options) {
    // const { dir, defaultLoaders, dev, isServer } = options;
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }
    config.plugins.push(
      new Webpack.DefinePlugin({
        'APP_VERSION': JSON.stringify(packageJSON.version),
        'API': JSON.stringify(API),
        'OLD_DATAHUB_URL': JSON.stringify(packageJSON.config.OLD_DATAHUB_URL)
      }));

    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    config.module.noParse = /mapbox-gl/;
    config.devtool = 'cheap-source-map';

    return config;
  }
});
