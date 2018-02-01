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

    // Recives messages
    socket.on('createMessage', (msg) => {
        console.log('Message: ', msg)

        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the app',
        })

        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'New user has connected',
            createdAt: new Date().getDate()
        })
        
        // io.emit('NewMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })

        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    })

    // Sends message to client
    socket.emit('newMessage', {
        from: "meeee",
        text: "legaheagege",
        created: 1337
    })
})

server.listen(port, () => {
    console.log(`Server on : ${port}`)
})