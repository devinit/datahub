const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const Webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript')
const packageJSON = require('./package.json');
const {ANALYZE} = process.env;

module.exports = withTypescript({
  webpack(config, options) {  
    // const { dir, defaultLoaders, dev, isServer } = options;
    config.module.noParse = /mapbox-gl/;
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
      'API': JSON.stringify(packageJSON.config.API),
      'OLD_DATAHUB_URL': JSON.stringify(packageJSON.config.OLD_DATAHUB_URL)
    }));
  
    return config;
  }
})
