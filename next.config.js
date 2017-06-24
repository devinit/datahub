const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // changes: configChanges, // for use in storybook webpack config
  webpack: (config, { dev }) => {
    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.concat([
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
        }),
        new webpack.EnvironmentPlugin(['MapboxAccessToken'])
      ]);
    }
    // const alias = Object.assign(config.resolve.alias, {
    //   'mapbox-gl': path.resolve('node_modules/mapbox-gl/dist/mapbox-gl.js'),
    //   'mapbox-gl$': path.resolve('node_modules/mapbox-gl/dist/mapbox-gl.js')
    // });
    // config.resolve.alias = alias;
    return config;
  }
};
