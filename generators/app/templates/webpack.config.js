var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './app/scene/index.js',

  output: {
    path: 'release',
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: 'babel'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }
    ]
  },

  plugins: [
  	new ExtractTextPlugin("[name].css", {
            allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
    new webpack.HotModuleReplacementPlugin()
  ]


}

