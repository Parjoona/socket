const expect = require('expect')

const {
    Users
} = require('./users')

describe('#Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [{
                id: '11234',
                name: 'Ello',
                room: 'Yelling'
            },
            {
                id: '3',
                name: 'Elisabeth',
                room: 'Yelling'
            },
            {
                id: '14234',
                name: 'Ahlo',
                room: 'React'
            }
        ]
    })

    it('Should add new user', () => {
        let users = new Users()
        let user = {
            id: '111',
            name: 'Pauma',
            room: 'Dancing'
        }

        let resp = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })

    it('Should return user list', () => {
        let list = users.getUserList('Yelling')
        expect(list).toMatchObject(['Ello', 'Elisabeth'])
    })

    it('Should remove user', () => {
        let id = '3'

        let user = users.removeUser(id)
        expect(user.id).toBe(id)
        expect(users.users.length).toBe(2)
    })

    it('Should not remove user', () => {
        let id = '343'

        let user = users.removeUser(id)
        expect(user).toBeFalsy()
        expect(users.users.length).toBe(3)
    })

    it('Should return user', () => {
        let userId = '3'
        let user = users.getUser(userId)

        expect(user.id).toBe(userId)
    })

    it('Should not return user', () => {
        let userId = '44'
        let user = users.getUser(userId)

        expect(user).toBeFalsy()
    })
})