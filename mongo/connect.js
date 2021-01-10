const extMain = require ('./main')

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
require('dotenv').config();
const { MongoClient } = require("mongodb");

var collection;

// Replace the following with your Atlas connection string                                                                                                                                        
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        await mainFcns();
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       console.log("Disconnected");
    }
}
run().catch(console.dir);

async function mainFcns (){
   // await extMain.listDatabases(client);
    await extMain.findOneListingByName(client,"Ribeira Charming Duplex");



  //  await extMain.updateListingByName(client, "Infinite Views", { score: 0.1});

}
