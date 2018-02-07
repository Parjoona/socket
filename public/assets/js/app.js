let socket = io()

socket.on('connect', function () {
    console.log('Found server, connected')
})

socket.on('disconnect', function () {
    console.log('disconnected')
})

socket.on('newMessage', function (message) {
    console.log('Message: ', message)
    $('<li>', {
        text: `${message.from}: ${message.text}`
    }).appendTo($('#message-output'))
})

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User_Form',
        text: $('[name=message]').val()
    }, function() {
        
    })
})