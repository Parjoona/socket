const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const pubPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

const {
    generateMessage,
    generateLocationMessage
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
    socket.on('createMessage', (msg, callback) => {
        console.log('Message: ', msg)

        io.emit('newMessage', generateMessage(msg.from, msg.text))

        // (reject, resolve)
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
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