/**
 * builds worker script using webpack & babel and dumbps it into the public folder
 * this gives us a url for use in instatiating a worker.
 * This work around is here coz next.js doesnt run webpack loaders serverside
 * see more https://github.com/zeit/next.js#customizing-babel-config,
 * https://github.com/zeit/next.js/issues/1245
 */
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    worker_gp: path.resolve(__dirname, '../../private/lib/workers/global-picture.js'),
    worker_uganda: path.resolve(__dirname, '../../private/lib/workers/spotlight-ug.js'),
    worker_kenya: path.resolve(__dirname, '../../private/lib/workers/spotlight-ke.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel']
          }
        }
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
      console.error(err);
    }
  });
};


if (process.env.NODE_ENV !== 'test') build();
