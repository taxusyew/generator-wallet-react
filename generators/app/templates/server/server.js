var appServer = require("./server-webpack");
var apiServer = require("./server-api");
// import appServer from './server-webpack.js';
// import apiServer from './server-api.js';

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
    apiServer.start(PORT);
} else {
    apiServer.start(PORT - 1);
    appServer.start(PORT);
}
