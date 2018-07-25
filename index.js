var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 8880;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
    console.log("Application started listening port " + port);
});