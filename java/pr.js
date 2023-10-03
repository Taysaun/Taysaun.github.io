//Sets object that has an amount and methods to change the amount

var bank = {
    amount: 0,
    //Adds money to the amount property
    deposit(pay){
        this.amount = pay + this.amount
    },
    //List that logs each deposit
    payLog: [],
    //A dictionary of expenses
    expense: {}

}
//Adds money to the amount in the bank object
//This code is ran when the submit button is clicked
const addMoney = () => {
    var payAmount = Number(document.getElementById('payAmount').value)
    if (payAmount){
        bank.payLog.push(payAmount)
        for (i = bank.payLog.length - 1; i < bank.payLog.length; i++) {
            bank.deposit(bank.payLog[i])
        }
        document.getElementById("amountBox").innerHTML = bank.amount
        document.getElementById('payAmount').value = ''
    } else {
        document.getElementById('amountBox').innerHTML = 'INVALID'
    };
};
//Prints the last deposit submitted to the page
const lastDeposit = () => {
    document.getElementById('lastDeposit').innerHTML = bank.payLog[bank.payLog.length - 1]
    return bank.payLog[bank.payLog.length - 1]
}
//Prints the entire log of deposits to the page
const depositLog = () => {
    document.getElementById('depositLog').innerHTML = bank.payLog.join('  ')
};
//Adds an expense to the expense log
const newExpense = () => {
    let value = document.getElementById('expenseAmount').value
    let numValue = Number(value)
    if (numValue){
        var desc = document.getElementById('description').value
        if (desc){
            bank.expense[desc] = numValue
            document.getElementById('expenseAmount').value = ''
            document.getElementById('description').value = ''
        }
    }
}
//Prints the expense log to the page
const expenseLog = () => {
    var value = []
    var desc = []
    for (let item in bank.expense){
        value.push(bank.expense[item])
        desc.push(item)
    }
    var expenseList = []
    for (let i = 0; i < value.length; i++){
        expenseList.push(`${desc[i]} : ${value[i]}`)
    }
    document.getElementById('expenseLog').innerHTML = expenseList.join(', ')
    if (value.length != 0){
        return value.reduce((a,b) => a + b)
    }
}
//Removes a selected item from the expense log
const removeItem = () => {
    let des = document.getElementById('description').value
    if (des in bank.expense){
        delete bank.expense[des]
        document.getElementById('description').value = ''
    }
}
//Applies all expenses to the balance
//Will print an error if balance isn't high enough
const applyAll = () => {
    if (expenseLog() <= bank.amount){
        bank.amount -= expenseLog()
        document.getElementById('amountBox').innerHTML = bank.amount
        bank.expense = {}
    } else {
        document.getElementById('amountBox').innerHTML = 'Insufficient Funds'
    }
}

const applyOne = () => {
    var des = document.getElementById('description').value
    if (bank.expense[des] <= bank.amount){
        bank.amount -= bank.expense[des]
        document.getElementById('amountBox').innerHTML = bank.amount
    }
}




