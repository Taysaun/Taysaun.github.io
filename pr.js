let num = 5
console.log(num)

const money = () => {
    var stuff = {
        amount: 10,
        paycheck: function(pay){
            this.amount = pay + this.amount
        },
    }
    return stuff
}
var bank = money()

bank.paycheck(134)
bank.paycheck(543)
bank.paycheck(345)
console.log(bank.amount)
