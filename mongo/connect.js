const extMain = require ('./main')

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);

const { MongoClient } = require("mongodb");

var collection;
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://testuser12:nwhacks12@cluster0.n1vnq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        await extMain.listDatabases(client);
      //  await createListing(createListing,);
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
    }
}
run().catch(console.dir);


function myFunction(){
    app.use("/public", express.static(__dirname + "/public")); 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, '0.0.0.0', function(){
    console.log('listening on *:3000');
});
    
output = {};
collection.insert(output, function (err, result) {});
}
