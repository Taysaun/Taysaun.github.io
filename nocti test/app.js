const readline = require("readline-sync")

class Person{
    constructor(name, address){
        this.name = name
        this.address = address
    }
}
console.log(new Order("mike", "2325 Golden Eagle Drive"))

var orders = []

function newOrder(){
    var name = readline.question("what is your name? ")
    var address = readline.question("what is your address? ")
    var item = readline.question("What item are you adding? ")
    var price = readline.question("What is the price? ")
    var quantity = readline.question("how many? ")

    var order = new Person(name, address)
    orders.push(order)
}


var running = true

while(running) {
    console.log("1. New Order\n 2. View Orders\n")
    var choice = readline.question("What would you like to do? ")
    switch (choice){
        case "1":
            newOrder();
            break;
        case "2":
            viewOrders();
            break;
        default:
            console.log("Invalid Choice")
    }
}
//need items, quantity, price, total, subtotal, tax, and shipping