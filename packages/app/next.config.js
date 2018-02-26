const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path')
const Webpack = require('webpack');
const packageJSON = require('./package.json');

const {ANALYZE} = process.env;

module.exports = {
  webpack: (config, options) => {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      )
    }
  
    const { dir, defaultLoaders, dev, isServer } = options
  
    config.resolve.extensions.push('.ts', '.tsx')
  
    if (dev && !isServer) {
      config.module.rules.push({
        test: /\.(ts|tsx)(\?[^?]*)?$/,
        loader: 'hot-self-accept-loader',
        include: [path.join(dir, 'pages')]
      })
    }
  
    config.module.rules.push({
      test: /\.+(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'ts-loader',
          options: Object.assign(
            {},
            {
              transpileOnly: true
            }
          )
        }
      ]
    })
    
    if (isServer) {
      config.module = Object.assign(config.module, {
        noParse: /mapbox-gl/
      });
    }
    

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }
    config.plugins.push(
      new Webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(packageJSON.version),
      'API': JSON.stringify(packageJSON.config.API),
      'OLD_DATAHUB_URL': JSON.stringify(packageJSON.config.OLD_DATAHUB_URL)
    }));
    return config
  }
}