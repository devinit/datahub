const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withTypescript = require('@zeit/next-typescript')
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
      'process.env.config.version': JSON.stringify(packageJSON.version),
      'process.env.config.NEXT': true,
      'process.env.config.api': JSON.stringify(packageJSon.config.api),
      'process.env.config.old_datahub': JSON.stringify(packageJSon.config.old_datahub)
    })
  ];

  const plugins = config.plugins.concat(additionalPlugins);

  const module = Object.assign(config.module, {
    noParse: /(mapbox-gl)\.js$/
  });

  const customConfig = Object.assign(config, { module }, {plugins});

  return customConfig;
};
module.exports = withTypescript(webpackConfs)
