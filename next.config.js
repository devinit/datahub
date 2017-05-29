const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const path = require('path');

module.exports = {
  // changes: configChanges, // for use in storybook webpack config
  webpack: (config, { dev }) => {
    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//, /\.map$/],
          staticFileGlobs: [
            'public/**/*' // Precache all static files by default
          ],
          forceDelete: true,
          stripPrefix: 'public',
          runtimeCaching: [
            // Example with different handlers
            {
              handler: 'fastest',
              urlPattern: /[.](png|jpg|css)/
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/ // cache all files
            },
            {
              handler: 'networkFirst',
              urlPattern: /^https.*/ // cache all files
            }
          ]
        })
      );
    }
    return config;
  }
};
