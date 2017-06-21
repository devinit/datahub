const path = require('path');
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


const moduleResolver = {
  resolve: {
    modules: ['node_modules',
              path.resolve(__dirname, 'private'),
              path.resolve(__dirname, 'public/semantic'),
              path.resolve(__dirname, 'public/img')],
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': path.resolve('node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  }
};

module.exports = (config, env) => {
  const webpack = genDefaultConfig(config, env);
  // Extend it as you need.
  return Object.assign(webpack, moduleResolver);
};
