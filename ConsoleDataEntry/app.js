const readline = require("readline")
const { stdin: input, stdout: output } = require('process');

var interface = readline.createInterface({
    input, output
})

interface.question('What do you like to do?', function (line) {
    console.log('Line: ' + line)
})