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
var dollar = money()

dollar.paycheck(134)
dollar.paycheck(543)
dollar.paycheck(345)
console.log(dollar.amount)
