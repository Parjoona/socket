const expect = require('expect');
const {
    isRealString
} = require('./validation')

describe('#Is real string', () => {
    it('Should reject non-string values', () => {
        let number = isRealString(214536)
        expect(number).toBeFalsy()
    })

    it('Should reject non-trimmed values', () => {
        let string = isRealString('        ')
        expect(string).toBeFalsy()
    })

    it('Should allow normal string', () => {
        let string = isRealString('Username')
        expect(string).toBeTruthy()
    })
})