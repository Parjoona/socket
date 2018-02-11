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

const {
    isRealString
} = require('./utils/validation')

const {
    Users
} = require('./utils/users')

let app = express()

// createServer takes req, res callback
// Can use express instead
let server = http.createServer(app)
// Communication line to the client-side
let io = socketIO(server)

let users = new Users()

app.use(express.static(pubPath))

io.on('connection', (socket) => {
    console.log('New user connection')

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
        }
    })

    // Recives messages
    socket.on('createMessage', (msg, callback) => {
        console.log('Message: ', msg)

        io.emit('newMessage', generateMessage(msg.from, msg.text))

        // (reject, resolve)
        callback()
    })

    socket.on('join', (param, callback) => {
        if (!isRealString(param.name) && !isRealString(param.room)) {
            return callback('Name and roomname is not valid')
        }

        socket.join(param.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, param.name, param.room)

        io.to(param.room).emit('updateUserList', users.getUserList(param.room))

        // Sends message to client after joining
        socket.emit('newMessage',
            generateMessage('Admin', 'Welcome to the chat App'))

        socket.broadcast.to(param.room).emit('newMessage',
            generateMessage('Admin', `${param.name} joined`))

        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })
})

server.listen(port, () => {
    console.log(`Server on : ${port}`)
})