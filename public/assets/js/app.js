let socket = io()

socket.on('connect', () => {
    console.log('Found server, connected')
})

socket.on('disconnect', () => {
    console.log('disconnected')    
})