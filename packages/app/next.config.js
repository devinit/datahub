const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {ANALYZE} = process.env;

module.exports = {
  // changes: configChanges, // for use in storybook webpack config
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }
    const additionalPlugins = [
      new webpack.DefinePlugin({
        'process.storybook': false
      })
    ];

    const plugins = config.plugins.concat(additionalPlugins);

    const module = Object.assign(config.module, {
      noParse: /(mapbox-gl)\.js$/
    });

    const customConfig = Object.assign(config, { module }, {plugins});

    return customConfig;
  }
};
