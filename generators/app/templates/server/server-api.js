var express = require("express");
var serveStatic = require('serve-static');
var fs = require('fs');

// var API = require('')
    // ...

module.exports.start = function (PORT) {
    const app = express();
    // app.use(serveStatic(__dirname + "/release"));
    // app.use('/cashdesk/wap/:api', function (req, res, next) {

    //     res.json(JSON.parse(fs.readFileSync("./mock/api/" + req.params.api +'.json', "utf-8")));
    //     console.log(req.params.api);
    //     next();
    // });

    // app.use('/_u/wap/:api', function (req, res, next) {

    //     res.json(JSON.parse(fs.readFileSync("./mock/api/" + req.params.api +'.json', "utf-8")));
    //     console.log(req.params.api);
    //     next();
    // });

    // app.use('/_u/wireless/:api', function (req, res, next) {

    //     res.json(JSON.parse(fs.readFileSync("./mock/api/" + req.params.api +'.json', "utf-8")));
    //     console.log(req.params.api);
    //     next();
    // });
    
    // app.use('/_u/fastpay/:api', function (req, res, next) {

    //     res.json(JSON.parse(fs.readFileSync("./mock/api/" + req.params.api +'.json', "utf-8")));
    //     console.log(req.params.api);
    //     next();
    // });

    [
        '/cashdesk/wap/:api',
        '/_u/wap/:api',
        '/_u/wireless/:api',
        '/_u/fastpay/:api',
        '/usercenter/card/:api'
    ].map(x=> {
        app.use(x, function (req, res, next) {

            res.json(JSON.parse(fs.readFileSync("./mock/api/" + req.params.api +'.json', "utf-8")));
            console.log(req.params.api);
            next();
        });
    })
    
    app.listen(PORT);
};
