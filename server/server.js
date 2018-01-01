const path = require('path')
const express = require('express')

const pubPath = path.join(__dirname, '../public')

let port = process.env.PORT;

const app = express()

app.use(express.static(pubPath))

app.listen(port, () => {
    console.log('Server on : ${port}');
})