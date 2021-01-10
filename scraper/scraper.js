const request = require('request');
const cheerio = require('cheerio');
const fs = require ('fs');

let globalResults = [];
let maxScore;
let minScore;

function main(callback){
  let out = new Array()
  request('https://en.wikipedia.org/wiki/Gay-friendly', (err, res, html) => {
    if (err || res.statusCode != 200) return [err];
    // out = {data: getCountryData(html)};
    // out = [...getCountryData(html)];
    out = getCountryData(html);
    // console.log(out[0])
    // console.log(globalResults[4])
    if (callback) return callback(out);
  });
}

function modifyGeoJson(){
  fs.readFile('../data/countries_compressed_arrayonly.geojson', 'utf8', (err, jsonString) => {
    if (err) {return []}
    let orig = JSON.parse(jsonString);
    // orig.forEach((o) => {console.log(o.properties.name)})
    orig.forEach((init)=>{
      init.properties.score = 0;
    })

    globalResults.forEach((r) => {
      // console.log('r = ', r.name)
      let destination = orig.find(o => o.properties.name === r.name)

      if (destination) {
        // console.log(destination.properties.name)
        // console.log("orig: ", destination.properties.score)
        destination.properties.score = r.score;
        // console.log("update", r.score)
        // console.log("modded; ", destination.properties.score)
      }
      // console.log(destination.properties.name)
      // console.log(destination.properties.score)
    })
    fs.writeFile('../data/countries_compressed_arrayonly.geojson', JSON.stringify(orig), err => {
      if (err) {console.log('Error writing file', err)} 
      else {console.log('Successfully wrote file')}
    })
    return orig;
  })
  
}

function getCountryData(html) {
  const $ = cheerio.load(html);
  // const countryTable = $('table.wikitable:nth-child(13) > tbody').text();

  
  let results = []
  $('table.wikitable:nth-child(13) > tbody > tr').each((idx, elem)=>{
    let country = removeDumbStuff($(elem).find('td:nth-child(2)').text());
    let score = Number($(elem).find('td:nth-child(3)').text()); //score
    if (!minScore || score < minScore) {minScore = score;}
    if (!maxScore || score > maxScore) {maxScore = score;}
    // console.log(country);
    // console.log(score);
    if(country && score) {
      globalResults.push({
        "name": country,
        "score": score
      });
    }
  });
  globalResults.forEach(r=>{
    // console.log(r.name, " old: ", r.score)
    r.score = scaleScore(minScore, maxScore, r.score)
    // console.log("new ", r.score)
  });
  return globalResults;
}

// Country
// Country [note ##] -> Country
// FakeName (Country) -> Country
function removeDumbStuff(str){
  let result = str;
  if(result.indexOf("[") != -1){
    result = result.substring(0, result.indexOf("["));
  }
  if(result.indexOf("(") != -1){
    result = result.substring(result.indexOf("(") + 1, result.indexOf(")"));
  }
  return result.trim();
}

// return scaled number (between -1 and 1) based on diff between min and max numbers in the data
function scaleScore(min, max, toScale) {
  let diff = max - min;
  return (2*(toScale - min) / (max - min))-1;
}

const out = ()=>{return main(modifyGeoJson)};

module.exports = out;