var httpProxy = require('http-proxy');
var port = process.env.PORT || 3214; 

var proxy = httpProxy.createProxyServer({target:'https://abvisit-poc.herokuapp.com'}).listen(port, function () {
	console.log("Application started listening port " + port);
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('close', function (res, socket, head) {
  console.log('Client disconnected');
});
 

