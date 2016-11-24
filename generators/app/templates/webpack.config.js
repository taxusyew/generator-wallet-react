var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');
var autoprefixer = require('autoprefixer');
var ip = require('ip');
var open = require("open");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// automatic open browser
open('http://'+ip.address()+':8080');

module.exports = {
    entry: './app/scene/index.js',

    output: {
        path: 'release',
        filename: 'bundle_[hash:6].js',
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 5 iOS versions', 'last 5 and_chr versions'] }) ],
    
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new ExtractTextPlugin("[name]_[hash:6].css", {
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

