const request = require('request');
const cheerio = require('cheerio');

// returns [{country: canada, score: 1}, {country: whatever, score: 0.5}]

const fakeResults = [{"country": "canada","score": 0.9},{"country": "united states","score": 0.4},{"country": "mexico","score": -0.1},{"country": "panama","score": -0.4}]

function main(){
  request('https://en.wikipedia.org/wiki/Gay-friendly', (err, res, html) => {
    if (err || res.statusCode != 200) return;
    // return getCountryData(html);
    return fakeResults;
  });
}

// In progress
function getCountryData(html) {
  const $ = cheerio.load()
  return 1;
}

// function getStateData(html) {}

// Function call left in for testing purposes
main();

module.exports = main;