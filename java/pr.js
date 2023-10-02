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

const lastDeposit = () => {
    for (i = 0; i < bank.payLog.length; i++){
        document.getElementById('lastDeposit').innerHTML = bank.payLog[i]
        console.log(bank.payLog[i])
    }
}
const depositLog = () => {
    document.getElementById('depositLog').innerHTML = bank.payLog.join('  ')
};

const newExpense = () => {
    let value = document.getElementById('expenseAmount').value
    let numValue = Number(value)
    if (numValue){
        let desc = document.getElementById('description').value
        bank.expense[desc] = numValue
        document.getElementById('expenseAmount').value = ''
        document.getElementById('description').value = ''
        console.log(bank.expense)
    }
}

const expenseLog = () => {
    var value = []
    var desc = []
    for (let item in bank.expense){
        //document.getElementById('expenseLog').innerHTML = `${item}: ${bank.expense[item]} `
        value.push(bank.expense[item])
        desc.push(item)
        for (let i = 0; i < bank.expense.length; i++)
        document.getElementById('expenseLog').innerHTML = `${desc[i]}: ${value[i]}`
    }
}



