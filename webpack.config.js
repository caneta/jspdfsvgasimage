const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const nodeEnv = process.env.NODE_ENV || 'production';
const nodeEnv = process.env.NODE_ENV || 'development';

console.log('=============================');
console.log(`Node Environment: ${nodeEnv}`);
console.log('=============================');

module.exports = {
  mode: nodeEnv,
  context: __dirname + '/src/js/',
  entry: {
    main: './main.js',
  },

  output: {
    filename: './bundle.min.js',
    path: __dirname + '/build/js/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
      VERSION: JSON.stringify(require('./package.json').version),
    }),

    new UglifyJsPlugin(),

    new webpack.ProvidePlugin({
      canvg: 'canvg',
    }),
  ],

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  // devtool: 'source-map',
};
