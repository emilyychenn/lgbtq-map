const extMain = require ('./main')

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
require('dotenv').config();
const { MongoClient } = require("mongodb");

var collection;

var ListTest = {
    
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
    
}
 
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
   // await extMain.createListing(client,ListTest);

  /**   await extMain.createMultipleListings(client, [
        {
            name: "Infinite Views",
            summary: "Modern home with infinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5
        },
        {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathroom: 1
        },
        {
            name: "Beautiful Beach House",
            summary: "Enjoy relaxed beach living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date()
        }
    ]);*/

    //await extMain.findOneListingByName(client, "Infinite Views");
    /** 
    await extMain.findMinListings(client, {
        minimumNumberOfBedrooms: 4,
        minimumNumberOfBathrooms: 2,
        maximumNumberOfResults: 5
    });*/

    await extMain.updateListingByName(client, "Infinite Views", { score: 0.1});

}
