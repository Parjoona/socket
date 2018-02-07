const expect = require('expect');
const {
    generateMessage,
    generateLocationMessage
} = require('./message')

describe('#GenerateMessages', () => {
    it('Should generate correct message object', () => {
        let from = 'MyPersonalMail'
        let text = 'A new message'
        let message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({
            from,
            text
        })

    })
})

describe('#GenerateLocationMessage', () => {
    it('Should generate location object', () => {
        let from = 'Admin'
        let long = 1
        let lat = 1
        let url = `https://www.google.com/maps?q=${lat},${long}`
        let message = generateLocationMessage(from, lat, long)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({
            from,
            url
        })
    })
})