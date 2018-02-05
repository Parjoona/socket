const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const pubPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

const {
    generateMessage
} = require('./utils/message')

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

    // Recives messages
    socket.on('createMessage', (msg) => {
        console.log('Message: ', msg)

        io.emit('newMessage', generateMessage(msg.from, msg.text))
    })

    // Sends message to client
    socket.emit('newMessage',
        generateMessage('Admin', 'Welcome to the chat App'))

    socket.broadcast.emit('newMessage',
        generateMessage('Admin', 'New account connected!'))
})

server.listen(port, () => {
    console.log(`Server on : ${port}`)
})