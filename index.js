'use strict';
var httpProxy = require('http-proxy');
const REST_PORT = process.env.PORT || 8081;

httpProxy.createServer({
    target: {
        
        port: 8080,
        host: 'http://gmdvproxy.acml.com'
    },
    forward: {
        port: 8880,
        host: 'http://10.82.184.75'
    }
}).listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});