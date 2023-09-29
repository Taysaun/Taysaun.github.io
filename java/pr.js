//Sets object that has an amount and methods to change the amount

var bank = {
    amount: 0,
    //Adds money to the amount property
    deposit(pay){
        this.amount = pay + this.amount
    },
    //List that logs each deposit
    payLog: []

}
//Adds money to the amount in the bank object
//This code is ran when the submit button is clicked
const addMoney = () => {
    var payAmount = Number(document.getElementById('payAmount').value)
    if (payAmount != NaN){
        bank.payLog.push(payAmount)
        for (i = bank.payLog.length - 1; i < bank.payLog.length; i++) {
            bank.deposit(bank.payLog[i])
        }
        document.getElementById("amountBox").innerHTML = bank.amount
        document.getElementById('payAmount').value = ''
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




