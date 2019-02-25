const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    // should put exports into global namespace, doesn't seem to
    // libraryTarget: 'var',
    // library: '[name]',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname + '/../../dist')
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: "all"
    },
    // minimizer: [new TerserPlugin({parallel: true, sourceMap: true})]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts'],
    symlinks: true
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {rootMode: 'upward'}
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ]
};
