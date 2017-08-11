const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

const {
  ANALYZE
} = process.env;

module.exports = {
  // changes: configChanges, // for use in storybook webpack config
  webpack: (config, {
    dev
  }) => {
    /* Enable only in Production */
    if (!dev && false) { // DISABLED Service work untill we set up https / ssl
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.map$/, /semantic.css$/],
          staticFileGlobs: [
            'public/**/*' // Precache all static files by default
          ],
          forceDelete: true,
          stripPrefix: 'public',
          runtimeCaching: [
            // Example with different handlers
            {
              handler: 'fastest',
              urlPattern: /^http.*/ // TODO refactor to have more specific matches
            },
            {
              handler: 'fastest',
              urlPattern: /^https.*/ // when live
            }
          ]
        }));
    }
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }
    config.plugins.push(new webpack.DefinePlugin({
      'process.storybook': false
    }));
    const module = Object.assign(config.module, {
      noParse: /(mapbox-gl)\.js$/
    });
    return Object.assign(config, { module });
  }
};
