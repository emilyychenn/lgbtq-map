var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const port = 8000;

// viewed at http://localhost:8000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/incoming', function(req, res) {
    fs.readFile('../data/incoming.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.listen(port, () => {
    console.log(`test server listening at http://localhost:${port}`)
})