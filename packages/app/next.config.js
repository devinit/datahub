const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const Webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript')
const packageJSON = require('./package.json');
const {ANALYZE} = process.env;

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
      'API': JSON.stringify(packageJSON.config.API),
      'OLD_DATAHUB_URL': JSON.stringify(packageJSON.config.OLD_DATAHUB_URL)
    }));
    // without this, mapbox.gl gets parsed by webpack
    const resolve = {
      alias: {
        'mapbox-gl$': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      }
    };
    config.resolve = Object.assign(config.resolve, resolve);
    // webpack shouldnt parse mapbox since it just messes it up. Mapbox should support server side rendering so
    // that we do away with these lines
    config.module.noParse = /mapbox-gl/;

    return config;
  }
})
