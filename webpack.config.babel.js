var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/client/index.js'),
  output: { path: '/' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};