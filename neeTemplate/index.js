const fs = require("fs")

var data = fs.readFileSync("data.json")

data = JSON.parse(data)
data.taysaun += 1
fs.writeFileSync("data.json", JSON.stringify(data))

const express = require('express')

const app = express()

const PORT = 200

app.set("view engine", "ejs")

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})



