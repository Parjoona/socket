let socket = io()

socket.on('connect', function () {
    console.log('Found server, connected')
})

socket.on('disconnect', function () {
    console.log('disconnected')
})

socket.on('newMessage', function (message) {
    let formatTime = moment(message.createdAt).format('h:mm a')

    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formatTime
    })

    $('#message-output').append(html)
})

socket.on('newLocationMessage', (message) => {
    let formatTime = moment(message.createdAt).format('h:mm a')
        
    let template = $('#location-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatTime
    })

    $('#message-output').append(html)
})

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    let msg = $('[name=message]')

    socket.emit('createMessage', {
        from: 'Usher',
        text: msg.val()
    }, function () {
        msg.val('')
    })
})

let locButton = $('#location-button')

locButton.on('click', () => {
    if (!navigator.geolocation) return alert('NO GEOLOCATION')
    locButton.attr('disabled', 'disabled').text('Sending Location')
    navigator.geolocation.getCurrentPosition((position) => {
        locButton.removeAttr('disabled').text('Send Location')
        let longitude = position.coords.longitude
        let latitude = position.coords.latitude

        socket.emit('createLocationMessage', {
            latitude,
            longitude
        })
    }, () => {
        alert('Cannot fetch location')
        locButton.removeAttr('disabled').text('Send Location')
    })
})