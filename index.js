var http = require('http'),
    httpProxy = require('http-proxy');
var port = process.env.PORT || 3214; 
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('close', function (res, socket, head) {
  // view disconnected websocket connections
  console.log('Client disconnected');
});
 
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log(req.headers);
  proxy.web(req, res, { target: 'https://abvisit-poc.herokuapp.com' });
});
 
console.log("proxy listening on port "+port)
server.listen(port);
