const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Portfolio SLO', () => {
    
    const PortfolioSLOController = require('../../../main/controllers/PortfolioSLOController')
    const PortfolioSLO = require('../../../main/models/CoursePortfolio/StudentLearningOutcome')

    // this is ran after each unit test
    afterEach(() => {
        // this is needed to restore the CoursePortfolio model back to it's original state
        // we don't want to break all future unit tests
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '1'
        let slo_id = '1'
        expected_payload = {
            portfolio_id: 1,
            slo_id: 1
        }
        // Act
        let payload = await TestPortfolioSLOController.generateCoursePayload(portfolio_id, slo_id)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '1'
        let slo_id = '1'
        let portfolio_slo_expected = {
            id: 1,
            portfolio_id: portfolio_id,
            slo_id: slo_id
        }

        sandbox.stub(PortfolioSLO, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    portfolio_id: portfolio_id,
                    slo_id: slo_id
                })
            })
        })
        
        // Act
        let portfolio_slo_retrieved = await TestPortfolioSLOController.getByAttributes(portfolio_id, slo_id)

        // Assert
        expect(portfolio_slo_retrieved).to.deep.equal(portfolio_slo_expected)  
    })

    it('gets by id', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let id = 1
        let portfolio_id = '1'
        let slo_id = '1'
        let portfolio_slo_expected = {
            id: id,
            portfolio_id: portfolio_id,
            slo_id: slo_id
        }

        sandbox.stub(PortfolioSLO, "query").returns({
            findById: sandbox.stub().returns({
                id: id,
                portfolio_id: portfolio_id,
                slo_id: slo_id
            })
        })
        
        // Act
        let portfolio_slo_retrieved = await TestPortfolioSLOController.getById(id)

        // Assert
        expect(portfolio_slo_retrieved).to.deep.equal(portfolio_slo_expected) 
    })

    it('inserts', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '1'
        let slo_id = '1'
        portfolio_slo_expected = {
            id: 1,
            portfolio_id: portfolio_id,
            slo_id: slo_id
        }        

        sandbox.stub(PortfolioSLO, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                portfolio_id: portfolio_id,
                slo_id: slo_id
            })
        })
        
        // Act
        let portfolio_slo_inserted = await TestPortfolioSLOController.insert(portfolio_id, slo_id)

        // Assert
        expect(portfolio_slo_inserted).to.deep.equal(portfolio_slo_expected)
    })

    it('updates by id', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '2'
        let slo_id = '2'
        let id = 2
        let portfolio_slo_expected = {
            id: id,
            portfolio_id: portfolio_id,
            slo_id: slo_id
        }

        sandbox.stub(PortfolioSLO, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: 2,
                portfolio_id: portfolio_id,
                slo_id: slo_id
            })
        })
        
        // Act
        let portfolio_slo_retrieved = await TestPortfolioSLOController.updateById(id, portfolio_id, slo_id)

        // Assert
        expect(portfolio_slo_retrieved).to.deep.equal(portfolio_slo_expected)  
    })

    it('delete by attributes', async () => {        
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '1'
        let slo_id = '1'
        sandbox.stub(PortfolioSLO, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(1)
                })
            })
        })
        
        // Act
        let portfolio_slo_deleted = await TestPortfolioSLOController.deleteByAttributes(portfolio_id, slo_id)

        // Assert
        expect(portfolio_slo_deleted).to.equal(true)
    })

    it('delete returns false if invalid attributes', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '-1'
        let slo_id = '-1'
        sandbox.stub(PortfolioSLO, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(0)
                })
            })
        })

        // Act
        let portfolio_slo_deleted = await TestPortfolioSLOController.deleteByAttributes(portfolio_id, slo_id)

        // Assert
        expect(portfolio_slo_deleted).to.equal(false)
    })

    it('delete by id', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let id = 1
        sandbox.stub(PortfolioSLO, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let portfolio_slo_deleted = await TestPortfolioSLOController.deleteById(id)

        // Assert
        expect(portfolio_slo_deleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let id = 404
        sandbox.stub(PortfolioSLO, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let portfolio_slo_deleted = await TestPortfolioSLOController.deleteById(id)

        // Assert
        expect(portfolio_slo_deleted).to.equal(false)

    })

    it('portfolio_id sanitation with negative integer', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '-5'
        
        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)
        // Assert
        expect(slo_status).to.equal(0)
    })

    it('portfolio_id sanitation with empty input', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = ''

        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)
        // Assert
        expect(slo_status).to.equal(0)
    })

    it('portfolio_id sanitation with integer at max SQL value', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        var t = Math.pow(2,31)
        let portfolio_id = t.toString()

        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)

        // Assert
        expect(slo_status).to.equal(1)
    })

    it('portfolio_id sanitation with integer above max SQL value', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        var t = Math.pow(2,32)
        let portfolio_id = t.toString()

        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('portfolio_id sanitation with input as 0', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '0'

        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('portfolio_id sanitation with valid input', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let portfolio_id = '1'

        // Act
        let slo_status = TestPortfolioSLOController.sanitizePortfolioId(portfolio_id)

        // Assert
        expect(slo_status).to.equal(1)
    })

    it('slo_id sanitation with negative integer', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let slo_id = '-5'

        // Act
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('slo_id sanitation with empty input', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let slo_id = ''

        // Act
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('slo_id sanitation with input at max SQL value', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        var t = Math.pow(2,31)
        let slo_id = t.toString()

        // Act
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(1)
    })

    it('slo_id sanitation with input above max SQL value', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        var t = Math.pow(2,32)
        let slo_id = t.toString()

        // Act 
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('slo_id sanitation with input as 0', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let slo_id = '0'

        // Act
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(0)
    })

    it('slo_id sanitation with valid input', function () {
        // Arrange
        let TestPortfolioSLOController = new PortfolioSLOController()
        let slo_id = '1'

        // Act
        let slo_status = TestPortfolioSLOController.sanitizeSLOId(slo_id)

        // Assert
        expect(slo_status).to.equal(1)
    })

    
})