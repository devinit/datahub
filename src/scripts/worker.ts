/**
 * builds web worker script using webpack and dumbps it into the static folder
 * this gives us a url for use in instatiating a worker.
 * This was work around coz next.js wouldnt use loaders until version 5
 * in which case we could have used a webworker loader
 */
import * as path from 'path';
const webpack = require('webpack');
const HappyPack = require('happypack');
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
        loader: 'happypack/loader?id=ts',
        options: {
          transpileOnly: true ,
          configFile
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new HappyPack({
      id: 'ts',
      threads: 3,
      loaders: [
          {
              path: 'ts-loader',
              query: { happyPackMode: true }
          }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
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
