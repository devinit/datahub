const withTypescript = require('@zeit/next-typescript');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const packageJSON = require('./package.json');

const {ANALYZE} = process.env;

 const webpackConfs =  (config, options) => {
  
  if (ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true
    }));
  }

  const additionalPlugins = [
    new webpack.DefinePlugin({
      'process.storybook': false,
      'process.version': packageJSON.version,
      'process.config.api': packageJSON.config.api,
      'process.config.old_datahub': packageJSON.config.old_datahub
    })
  ];

  const plugins = config.plugins.concat(additionalPlugins);

  const module = Object.assign(config.module, {
    noParse: /(mapbox-gl)\.js$/
  });

  const customConfig = Object.assign(config, { module }, {plugins});

  return customConfig;
}

module.exports = withTypescript(webpack(webpackConfs));
