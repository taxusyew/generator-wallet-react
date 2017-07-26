var webpack = require('webpack');
var config = require("../webpack.dev.config.js");
var WebpackDevServer = require("webpack-dev-server");
var ip = require('ip');

config.entry.unshift(`webpack-dev-server/client?http://${ip.address()}:8080/`, "webpack/hot/dev-server");
// config.entry.unshift(`webpack-dev-server/client?http://${ip.address()}:8080/`);

module.exports.start = function (PORT) {
    const server = new WebpackDevServer(webpack(config), {
        stats: { colors: true },
        proxy: {
            "*": `http://${ip.address()}:${PORT - 1}`
        },
        inline: true,
        hot: true,
        // watchContentBase: true,
        // watchOptions: {
        //     poll: true
        // },
        disableHostCheck: true 
        
        // ... rest of the options
    });
    server.listen(PORT, '0.0.0.0');
}
