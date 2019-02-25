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
    path: path.resolve(__dirname + '/../../dist')
  },
  optimization: {
    splitChunks: {
      name: "true",
      chunks: "all"
    },
    // minimizer: [new TerserPlugin({parallel: true, sourceMap: true})]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts'],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              // "@babel/typescript",
              "@babel/preset-env"
            ],
            // "plugins": [
            //   "@babel/proposal-class-properties",
            //   "@babel/proposal-object-rest-spread"
            // ]
          }
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
