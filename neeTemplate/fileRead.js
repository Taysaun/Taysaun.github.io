const fs = require('fs')

var data = fs.readFileSync("data.json");

data = JSON.parse(data)

data.taysaun += 1
fs.writeFileSync("data.json", JSON.stringify(data));
console.log(data)
