const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('src/'),
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],
  output: {
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-hot-loader' },
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
            },
          },
          { loader: 'sass-loader' },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: '../public/index.html' }),
    // new webpack.IgnorePlugin(/\.svg$/),
    // new OfflinePlugin({ caches: { main: [] } }),
  ],
  devServer: {
    hot: true,
    inline: true,
    open: true,
    port: '8080',
    stats: {
      hash: true,           // add the hash of the compilation
      version: false,       // add webpack version information
      timings: true,        // add timing information
      assets: false,        // add assets information
      chunks: true,         // add chunk information
      chunkModules: false,  // add built modules information to chunk information
      modules: false,       // add built modules information
      cached: true,         // add also information about cached (not built) modules
      reasons: true,        // add information about the reasons why modules are included
      source: false,        // add the source code of modules
      errorDetails: false,  // add details to errors (like resolving log)
      chunkOrigins: false,  // add the origins of chunks and chunk merging info
      modulesSort: false,   // (string) sort the modules by that field
      chunksSort: false,    // (string) sort the chunks by that field
      assetsSort: false,
    }
  },
};