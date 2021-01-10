
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log();
    console.log(result.insertedIds);
}

async function findOneListingByName(client, nameOfListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .findOne({ name: nameOfListing });

 

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(`${result.bedrooms} is number of bedrooms in the function`);
        return result.bedrooms;
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
        return nameOfListing;
    }
}

async function findMinListings(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


// Actual data monkey time

/**
 * 
 * updates country score via its name
 * 
 * @param {*} client current client working in 
 * @param {*} currentCountry current country being updated
 * @param {*} updatedData what you want to change, am assuming it is the score (IS NOT BUILt To TOCUH THE GEO FILE)
 */

async function updateCountryScorebyName(client, currentCountry, updatedData) {
    result = await client.db("JSON_Objects").collection("JSON_Countries").updateOne({ country: currentCountry }, { $set: updatedData });
}

/**
 * Make the country
 * 
 * @param {*} client given country
 * @param {*} newCountry new country object being put to the database
 */

async function createCountry(client, newCountry){
    const result = await client.db("JSON_Objects").collection("JSON_Countries").insertOne(newCountry);
}


/**
 * 
 * Finds the score of the given country, 
 * 
 * CURRENTLY JUST PRINTS AND DOES NOT RETURN, UN-COMMENT THE RETURN STATEMENTS TO CHANGES THIS
 * 
 * @param {*} client the current client working with MongoDB
 * @param {*} nameOfCountry the name of country that is deleted
 */

async function findCountryScorebyName(client, nameOfCountry) {
    result = await client.db("JSON_Object").collection("JSON_Countries")
                        .findOne({ country: nameOfCountry });

    if (result) {
     //   console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(`${result.score} is the score.`);
     //   return result.score;
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
        //return nameOfCountry;
    }
}

/**
 * 
 * this function deletes the country by its name
 * 
 * THIS FCNT IS NOT WORKING, IDK Y
 * 
 * 
 * @param {*} client the current client working with MongoDB
 * @param {*} nameOfCountry the name of country that is deleted
 */

async function deleteCountryByName(client, nameOfCountry) {
    result = await client.db("JSON_Objects").collection("JSON_Countries").deleteOne({ name: nameOfCountry });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}


async function findCountryByName(client, nameOfCountry) {
    result = await client.db("JSON_Objects").collection("JSON_Countries")
                        .findOne({ name: nameOfCountry });

    if (result) {
        return result;
    } else {
        console.log(`error in finding objects `);
    }
}

async function makeLargeArray(client,nameArray){
    var myArray = new Array();

    for (i= 0; i < nameArray.length;i++){
        myArray[i]= await findCountryByName(client,nameArray[i]);
    }

    return myArray;

}


var NameArray = [
    '','Australia','Canada','Malta','Sweden','Austria','United Kingdom','Argentina','Netherlands','Spain',
    'Uruguay','Denmark','Germany','Iceland','New Zealand','Portugal','Belgium','Colombia','Switzerland','Finland',
    'Luxembourg','Norway','Réunion','France','Gibraltar','Greenland','Ireland',
    'Israel','Puerto Rico','South Africa','Taiwan','French Polynesia','New Caledonia','United States',
    'Andorra','Guadeloupe','Martinique','Slovenia','Czech Republic','Estonia','Guam','Chile',
    'Ecuador','Italy','Liechtenstein','Nepal','Slovakia','Thailand','India',
    'Bermuda','Bolivia','Brazil','Croatia','Hungary','Mexico',
    'Mozambique','Bosnia and Herzegovina','Botswana','Costa Rica','Cuba','Cyprus',
    'Greece','South Korea','Macau','Seychelles','US Virgin Islands',
    'Angola','Cambodia','incl.  Hong Kong','El Salvador','Fiji','Japan',
    'Lesotho','Lithuania','Mongolia','Panama', 'San Marino','Serbia','Albania','Aruba', 
    'Benin','Bulgaria','Curaçao','Kosovo','Laos',
    'Latvia','Mali','Monaco','Montenegro','Romania','Sint Maarten','Turkey','Armenia',
    'Vietnam','British Virgin Island','Cabo Verde','Guinea-Bissau','Kazakhstan','North Macedonia','Moldova','Nicaragua','Niger',
    'Philippines','Singapore','Gabon','Belize','Georgia','Honduras','Kyrgyzstan','Peru',
    'Poland', 'Ukraine', 'Burkina Faso','Myanmar','Sri Lanka', 'Vanuatu', 'Venezuela',
    'Bhutan','Democratic Republic of the Congo','Indonesia','Kenya', 'Lebanon','Mauritius','Namibia','Pakistan','Republic of the Congo',
    'Rwanda','Samoa','Suriname', 'Syria','Tajikistan', 'Algeria','Antigua and Barbuda','Azerbaijan','Bahamas','Bahrain',
    'Bangladesh','Barbados','Djibouti','Equatorial Guinea','Guatemala','Jordan','North Korea', 'Madagascar', 'Trinidad and Tobago',
    'Tunisia','Vatican City','Belarus','Burundi', 'Dominican Republic','Grenada', 'Guyana','Ivory Coast','Oman',
     'Paraguay','Sierra Leone','Central African Republic','Ghana','Liberia', 'Togo', 'Tonga','Brunei','Chad',
     'Comoros','Cook Islands','Dominica','Ethiopia','Gambia','Haiti','Iraq','Jamaica','Maldives',
     'Mauritania',
     'Morocco', 
     'Papua New Guinea',
     'Russia',
     'Senegal',
     'Solomon Islands',
     'Eswatini',
     'Uzbekistan',
     'Zambia',
     'Egypt',
    'Eritrea', 
     'Indonesia',
     'Kuwait','Sudan','Tanzania', 'Turkmenistan',
     'Uganda',
     'Zimbabwe',
     'Cameroon', 'Malawi',
     'Malaysia',
     'Nigeria',
    'Qatar',
     'Afghanistan',
    'Libya',
     'United Arab Emirates',
     'Yemen',
     'Iran', 'Saudi Arabia','Somalia', 'Russia',
]


module.exports = {createCountry,updateCountryScorebyName,findCountryScorebyName,deleteCountryByName,getCollection,findCountryByName, makeLargeArray};