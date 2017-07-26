var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var ip = require('ip');
var open = require("open");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        vendors: ['react', 'react-dom', 'react-router'],
        app: path.resolve(__dirname, './app/scene/app.js')
    },
    
    output: {
        path: __dirname + '/dist',
        filename: '[name]_[hash:6].js',
        // publicPath: ''
        // publicPath: '//www.baifubao.com/static/exports/assets/'
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
                // use: ['file-loader?limit=100000&name=[md5:hash:base64:10].[ext]']
                use: ['url-loader?limit=1000&name=[md5:hash:base64:10].[ext]']
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors'}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/html/index.html',
            hash: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({ browsers: ['iOS >= 8', 'Android >= 4.1'] })]
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


}