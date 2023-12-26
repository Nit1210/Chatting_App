const path = require('path');
const { DefinePlugin } = require('webpack');

// Read Firebase configuration from firebase.json


module.exports = {
  entry: './Scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'Dist/assets'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'Dist/assets'),
    },
    devMiddleware: {
      publicPath: '/assets/',
    },
    port: 8001,
    hot: 'only',
  },
  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

};
