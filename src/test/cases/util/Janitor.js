const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Utility - Janitor', () => {

    const Janitor = require('../../../main/util/Janitor.js')

    // this is ran after each unit test
    afterEach(() => {
        // this is needed to restore the CoursePortfolio model back to it's original state
        // we don't want to break all future unit tests
        sandbox.restore()
    })

    it('sanitizeString(null) returns null', async () => {
        // Arrange
        test_input = null

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    it('sanitizeInt(null) returns null', async () => {
        // Arrange
        test_input = null

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    it('sanitizeString(int) returns string', async () => {
        // Arrange
        test_input = 100
        test_expected = "100"

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.deep.equal(test_expected)
    })

    it('sanitizeInt(int) returns int', async () => {
        // Arrange
        test_input = 100
        test_expected = 100

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.equal(test_expected)
    })

    it('sanitizeString(float) returns string', async () => {
        // Arrange
        test_input = 3.1415
        test_expected = "3.1415"

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.deep.equal(test_expected)
    })

    it('sanitizeInt(float) returns rounded int', async () => {
        // Arrange
        test_input = 3.1415
        test_expected = 3

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.equal(test_expected)
    })

    it('sanitizeString(string) returns string', async () => {
        // Arrange
        test_input = "This is a nice string"
        test_expected = "This is a nice string"

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.deep.equal(test_expected)
    })

    it('sanitizeInt(string) returns int', async () => {
        // Arrange
        test_input = "1234"
        test_expected = 1234

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.equal(test_expected)
    })

    it('sanitizeInt(bad string) returns null', async () => {
        // Arrange
        test_input = "bad string"
        test_expected = 1234

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    it('sanitizeString(object) returns null', async () => {
        // Arrange
        test_input = class Test {}
        test_expected = null

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    it('sanitizeInt(object) returns null', async () => {
        // Arrange
        test_input = class Test {}
        test_expected = null

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    
    it('toString() error returns null', async () => {
        // Arrange
        test_input = 10
        test_expected = null

        sandbox.stub(Janitor, "toStringHandler").throws("Stub Test Error")

        // Act
        test_output = Janitor.sanitizeString(test_input)

        // Assert
        expect(test_output).to.be.null
    })

    it('parseInt() error returns null', async () => {
        // Arrange
        test_input = 10
        test_expected = null

        sandbox.stub(Janitor, "parseIntHandler").throws("Stub Test Error")

        // Act
        test_output = Janitor.sanitizeInt(test_input)

        // Assert
        expect(test_output).to.be.null
    })

})
