const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    // should put exports into global namespace, doesn't seem to
    // libraryTarget: 'var',
    // library: '[name]',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + '../../dist')
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    // minimizer: [new TerserPlugin({parallel: true, sourceMap: true})]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ]
};
