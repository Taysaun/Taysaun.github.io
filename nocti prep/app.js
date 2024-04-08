// import readlinesync
const readline = require('readline-sync')

// track if the program is still running
var running = true

var orders = [];

//while the program is running
while (running) {
    console.log("1. New Order")
    console.log("2. View Orders")
    console.log("3. Exit")
    let choice = readline.question("What would you like to do? ")
    //print the menu AND resolve answer
    switch (choice) {
        case "1":
            newOrder();
            break;
        case "2":
            for (const order of orders) {
                viewOrders(order)
            }
            break;
        case "3":
            running = false;
            break;
        default:
            console.log("invalid choice");
            break;
    }
}

function newOrder(){
    let order = {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        shipping: 0
    }
    //ask for the customer name
    order.customer = readline.question("What is the customer's name?")
    //ask for the address
    order.address = readline.question("What is the customer's address?")
    //track if we are still ordering
    let ordering = true
    while (ordering){
        viewOrders(order)
        let choice = readline.question("1. Add Item\n2 Finish Order\n")
        switch (choice){
            case "1":
                order.items.push(addItem());
                order.subtotal = 0
                order.tax =  0
                for (const item of order.items) {
                    order.subtotal += item.price * item.quantity;
                    order.tax += item.price * item.quantity * 0.06
                    order.total = order.subtotal + order.tax
                    if (order.total > 25) {
                        order.shipping = 5;
                        order.total += order.shipping;
                    }
                }
                break;
            case "2":
                orders.push(order)
                ordering = false;
                break;
            default:
                console.log("Invalid Choice");
        }
    }
}

function addItem(){
    let item = {}
    item.name = readline.question("what is the item name? ")
    item.price = parseFloat(readline.question("What is the item price? "))
    item.quantity = parseInt(readline.question("What is the item quantity? "))
    return item
}

function viewOrders(order){
    console.log("Customer:" + order.customer)
    console.log("Address: " + order.address)
    console.log("Items: ")
    for (const item of order.items) {
        console.log(item.name)
        console.log(item.price)
        console.log(item.quantity)
    }
    console.log("tax $" + order.tax)
    console.log("shipping $" + order.shipping)
    console.log("subtotal $" + order.subtotal)
    console.log("total $" + order.total)
}