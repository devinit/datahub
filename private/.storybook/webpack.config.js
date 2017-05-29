const path = require('path');
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


const moduleResolver = {
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'private'),
              path.resolve(__dirname, 'public/semantic')],
  }
};

module.exports = (config, env) => {
  const webpack = genDefaultConfig(config, env);
  // Extend it as you need.
  return Object.assign(webpack, moduleResolver);
};
