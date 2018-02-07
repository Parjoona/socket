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

socket.on('newLocationMessage', (message) => {
    let li = $('<li>', {
        text: `${message.from}: `
    })
    let a = $('<a>', {
        text: 'My location',
        target: `_blank`,
        href: message.url
    })

    li.append(a).appendTo($('#message-output'))
})

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    let msg = $('[name=message]')

    socket.emit('createMessage', {
        from: 'Usheaheer_Form',
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