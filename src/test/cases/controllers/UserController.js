//const User = require('../../../main/models/User')
const { expect } = require('../../chai')
const sinon = require('sinon')

const sandbox = sinon.createSandbox()

describe ('Controller - User', () => {
    const UserController = require('../../../main/controllers/UserController')

    // this is ran after each unit test
    afterEach(() => {
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        const TestUserController = new UserController()
        let linkblue_id = 'abcd12'
        expected_payload = {
            linkblue_id: linkblue_id
        }

        // Act
        let payload = await TestUserController.generateUserPayload(linkblue_id)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        let TestUserController = new UserController()
        let linkblue_id = 'abcd12'
        let user_expected = {
            id: 1,
            linkblue_id: linkblue_id
        }

        sandbox.stub(User, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    linkblue_id: linkblue_id
                })
            })
        })
        
        // Act
        let user_retrieved = await TestUserController.getByAttributes(linkblue_id)

        // Assert
        expect(user_retrieved).to.deep.equal(user_expected)
    })

    it('insert', async () => {
        // Arrange
        let TestUserController = new UserController()
        let linkblue_id = 'abcd12'
        user_expected = {
            id: 1,
            linkblue_id: linkblue_id
        }        

        sandbox.stub(User, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                linkblue_id: linkblue_id
            })
        })
        
        // Act
        let user_inserted = await TestUserController.insert(linkblue_id)

        // Assert
        expect(user_inserted).to.deep.equal(user_expected)
    })

    it('gets by id', async () => {
        // Arrange
        let TestUserController = new UserController()
        let id = 1
        let linkblue_id = 'abcd12'
        let user_expected = {
            id: id,
            linkblue_id: linkblue_id
        }

        sandbox.stub(User, "query").returns({
            findById: sandbox.stub().returns({
                id: id,
                linkblue_id: linkblue_id
            })
        })
        
        // Act
        let user_retrieved = await TestUserController.getById(id)

        // Assert
        expect(user_retrieved).to.deep.equal(user_expected) 
    })

    it('updates by id', async () => {
        // Arrange
        let TestUserController = new UserController()
        let id = 1
        let linkblue_id = 'efgh34'
        let user_expected = {
            id: id,
            linkblue_id: linkblue_id
        }

        sandbox.stub(User, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: id,
                linkblue_id: linkblue_id
            })
        })
        
        // Act
        let user_retrieved = await TestUserController.updateById(id)

        // Assert
        expect(user_retrieved).to.deep.equal(user_expected)
    })

    it('delete by attributes', async () => {
        // Arrange
        let TestUserController = new UserController()
        let linkblue_id = 'abcd12'
        sandbox.stub(User, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(1)
                })
            })
        })
        
        // Act
        let userDeleted = await TestUserController.deleteByAttributes(linkblue_id)

        // Assert
        expect(userDeleted).to.equal(true)
    })

    it('delete returns false if invalid attributes', async () => {
        // Arrange
        let TestUserController = new UserController()
        let linkblue_id = 2
        sandbox.stub(User, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(0)
                })
            })
        })

        // Act
        let userDeleted = await TestUserController.deleteByAttributes(linkblue_id)

        // Assert
        expect(userDeleted).to.equal(false)
    })

    it('delete by id', async () => {
        // Arrange
        let TestUserController = new UserController()
        let id = 1
        sandbox.stub(User, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let userDeleted = await TestUserController.deleteById(id)

        // Assert
        expect(userDeleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestUserController = new UserController()
        let id = 404
        sandbox.stub(User, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let userDeleted = await TestUserController.deleteById(id)

        // Assert
        expect(userDeleted).to.equal(false)

    })
})