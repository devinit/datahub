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
const SRC_PATH = path.join(__dirname, '../workers');

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
    extensions: ['.ts', 'tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)(\?[^?]*)?$/,
        loader: 'ts-loader',
        include: [
            SRC_PATH
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
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
