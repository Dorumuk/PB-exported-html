const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    entry: 'index.js',
    output: {
      path: __dirname + '/dist',
      filename: 'index_bundle.js'
    },
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
};