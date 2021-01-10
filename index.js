var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const port = 5000;

// viewed at http://localhost:8000

app.use(express.static('./'));
app.use(express.static(__dirname + '/pages'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`test server listening at http://localhost:${port}`)
})