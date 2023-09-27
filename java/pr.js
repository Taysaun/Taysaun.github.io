const money = () => {
    var stuff = {
        amount: 10,
        paycheck: function (pay) {
            this.amount = pay + this.amount
        },
    }
    return stuff
}
var bank = money()
const addMoney = () => {
    var payAmount = Number(document.getElementById('payAmount').value)
    payLog.push(payAmount)
    console.log(payLog)
};

var payLog = [134, 543, 345]
for (i = 0; i < payLog.length; i++) {
    bank.paycheck(payLog[i])
}


document.getElementById("amountBox").innerHTML = bank.amount


