var http = require('http'),
    httpProxy = require('http-proxy');
var port = process.env.PORT || 3214; 
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
 
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log(req.headers);
  proxy.web(req, res, { target: 'https://abvisit-poc.herokuapp.com' });
});
 
console.log("proxy listening on port "+port)
server.listen(port);
