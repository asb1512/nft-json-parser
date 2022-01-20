// ability to interact with file system
const fs = require('fs');
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;

// defines CSV headers
const fields = [
  'name',
  'background',
  'onBack',
  'suit',
  'tie',
  'bling',
  'mouth',
  'eyes',
  'hair',
  'foreground',
  'signature',
];

// loads in current CSV file
CSVToJSON().fromFile('./input.csv').then(source => {

  // sets a for-loop to iterate through all JSON files
  for (let i = 0; i < 2; i++) {
    // loads in JSON file with template literals
    const jsonData = require(`./test${i}.json`);

    if (jsonData) {
      source.push({
        "name": jsonData.name,
        "background": jsonData["attributes"][0]["value"],
        "onBack": jsonData["attributes"][1]["value"],
        "suit": jsonData["attributes"][2]["value"],
        "tie": jsonData["attributes"][3]["value"],
        "bling": jsonData["attributes"][4]["value"],
        "mouth": jsonData["attributes"][5]["value"],
        "eyes": jsonData["attributes"][6]["value"],
        "hair": jsonData["attributes"][7]["value"],
        "foreground": jsonData["attributes"][8]["value"],
        "signature": jsonData["attributes"][9]["value"]
      });

      const csv = JSONToCSV(source, { fields: fields });
      fs.writeFileSync('./output.csv', csv);
    }
  };
});