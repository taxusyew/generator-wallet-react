var webpack = require('webpack');
var config = require("../webpack.dev.config.js");
var WebpackDevServer = require("webpack-dev-server");
var ip = require('ip');

module.exports.start = function (PORT) {
    const server = new WebpackDevServer(webpack(config), {
        stats: { colors: true },
        proxy: {
            "*": `http://${ip.address()}:${PORT - 1}`
        },
        // ... rest of the options
    });
    server.listen(PORT, '0.0.0.0');
}
