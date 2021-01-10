// var http = require('http'),
//     fs = require('fs');


// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(process.env.PORT || 5000)
// });

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

app.get('/incoming', function(req, res) {
    fs.readFile('../data/incoming.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.listen(port, () => {
    console.log(`test server listening at http://localhost:${port}`)
})