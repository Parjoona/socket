let socket = io()

socket.on('connect', function() {
    console.log('Found server, connected')
})

socket.on('disconnect', function() {
    console.log('disconnected')    
})

socket.on('newMessage', function(message) {
    console.log('Message: ', message)    
})