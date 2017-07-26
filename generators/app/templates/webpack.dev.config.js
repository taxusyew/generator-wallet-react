var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var ip = require('ip');
var open = require("open");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// automatic open browser
open('http://'+ip.address()+':8080');

module.exports = {
    entry: ['./app/scene/app.js'],

    output: {
        path: __dirname + '/dist',
        filename: 'bundle_[hash:6].js',
        publicPath: ''
    },

    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: ['babel-loader']
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader", "postcss-loader"]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader?limit=1300&name=[md5:hash:base64:10].[ext]']
            }
        ]
    },
    devtool: "eval",
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new ExtractTextPlugin({ 
            filename: "[name]_[hash:6].css",
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/html/index.html',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


}