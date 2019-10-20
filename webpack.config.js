const path = require('path');

module.exports = {
  entry: {
    'breadth-first-search/index': './src/breadth-first-search/visualisation/index',
  },
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  devtool: 'source-map'
};