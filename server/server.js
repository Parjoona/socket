const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const pubPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

let app = express()

// createServer takes req, res callback
// Can use express instead
let server = http.createServer(app)
// Communication line to the client-side
let io = socketIO(server)
app.use(express.static(pubPath))

io.on('connection', (socket) => {
    console.log('New user connection')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server on : ${port}`)
})