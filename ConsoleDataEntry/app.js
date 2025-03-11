const readline = require("readline")
const { stdin: input, stdout: output } = require('process');

var interface = readline.createInterface({
    input, output
})

let orders = [];

function run() {
    interface.write(" 1. Start New Order \n 2. Edit Existing Order \n 3. Show All Orders \n")
    
    interface.question('What would you like to do? ', function (answer) {
        console.log('You answered ' + answer)
        switch (answer) {
            case "1":
                interface.question("Enter Name: ", (answer) => {
                    username = answer
                    interface.question("Enter Address: ", (answer) => {
                        address = answer
                        orders.push({
                            name: username,
                            address: address
                        })
                        run()
                    })
                })
                break;
            case "2":
                break;
            case "3":
                break;
        }
    })
}

run()