const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // changes: configChanges, // for use in storybook webpack config
  webpack: (config, { dev }) => {
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
    // babel loader allows use of webpack loaders by babel. (something like that, I think so.. )
    // for instance the css loader
    config.module.rules.push({
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader'],
    });
    config.plugins.push(new webpack.DefinePlugin({
      'process.storybook': false
    }));
    const module = Object.assign(config.module, {noParse: /(mapbox-gl)\.js$/});
    return Object.assign(config, {module});
  }
};
