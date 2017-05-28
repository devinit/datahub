// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const baseConfig = require('../../next.config');

module.exports = (config, env) => {
  const webpack = genDefaultConfig(config, env);
  // Extend it as you need.
  return Object.assign(webpack, baseConfig.changes);
};
