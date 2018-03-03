/**
 * builds worker script using webpack & babel and dumbps it into the public folder
 * this gives us a url for use in instatiating a worker.
 * This work around is here coz next.js doesnt run webpack loaders serverside
 * see more https://github.com/zeit/next.js#customizing-babel-config,
 * https://github.com/zeit/next.js/issues/1245
 */
import * as path from 'path';
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const configFile = '../../tsconfig.json';

const config = {
  entry: {
    worker_gp: path.resolve(__dirname, '../../src/workers/global-picture.ts'),
    worker_uganda: path.resolve(__dirname, '../../src/workers/spotlight-ug.ts'),
    worker_kenya: path.resolve(__dirname, '../../src/workers/spotlight-ke.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../static')
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)(\?[^?]*)?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      API: JSON.stringify(process.env.npm_package_config_API)
    })
  ]
};

const build = () => {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('error: ', err);
    }
  });
};

if (process.env.NODE_ENV !== 'test') build();
