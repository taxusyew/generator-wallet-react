var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var ip = require('ip');
var open = require("open");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/scene/app.js',

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
                use: ['file-loader?limit=1000&name=[md5:hash:base64:10].[ext]']
            }
        ]
    },
    
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new ExtractTextPlugin({ 
            filename: "[name]_[hash:6].css",
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
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

