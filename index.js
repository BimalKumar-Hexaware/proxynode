'use strict';
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const REST_PORT = process.env.PORT || 8081;


app.post('/api', (req, res) => {
    console.log('Assistant req body: ' + JSON.stringify(req.body));
    var options = {
        proxy: 'http://gmdvproxy.acml.com:8080/',
        method: 'POST',
        url: 'http://10.82.184.75.:8880',
        headers:
        {
            'content-type': 'application/json',
        },
        body:req.body
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            reject("Something went wrong when processing your request. Please try again.");
        }
        console.log(body);
        resolve(body.result);
    });
});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});