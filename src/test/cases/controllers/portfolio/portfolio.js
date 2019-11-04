const { expect } = require('../../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Portfolio', () => {
    const PortfolioController = require('../../../../main/controllers/CoursePortfolio/PortfolioController')
    const Portfolio = require('../../../../main/models/CoursePortfolio/index')

    // reset after each unit test
    afterEach(() => {
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        // course_id, instructor_id, semester_term_id, num_students, section, year
        const TestPortfolioController = new PortfolioController()
        let course_id = '1'
        let instructor_id = '1'
        let semester_term_id = '1'
        let num_students = '10'
        let section = '1'
        let year = '2000'

        expected_payload = {
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 10,
            section: 1,
            year: 2000
        }

        // Act
        let payload = await TestPortfolioController.generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        // course_id, instructor_id, semester_term_id, num_students, section, year
        const TestPortfolioController = new PortfolioController()
        let course_id = '1'
        let instructor_id = '1'
        let semester_term_id = '1'
        let num_students = '10'
        let section = '1'
        let year = '2000'

        output_expected = {
            id: 1,
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 10,
            section: 1,
            year: 2000
        }

        sandbox.stub(Portfolio, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns({
                        where: sandbox.stub().returns({
                            where: sandbox.stub().returns({
                                where: sandbox.stub().returns({
                                    id: 1,
                                    course_id: 1,
                                    instructor_id: 1,
                                    semester_term_id: 1,
                                    num_students: 10,
                                    section: 1,
                                    year: 2000
                                })
                            })
                        })
                    })
                })
            })
        })
        
        // Act
        let output_test = await TestPortfolioController.getByAttributes(course_id, instructor_id, semester_term_id, num_students, section, year)

        // Assert
        expect(output_test).to.deep.equal(output_expected)  
    })

    it('gets by id', async () => {
        // Arrange
        // course_id, instructor_id, semester_term_id, num_students, section, year
        const TestPortfolioController = new PortfolioController()
        let id = '1'

        output_expected = {
            id: 1,
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 10,
            section: 1,
            year: 2000
        }

        sandbox.stub(Portfolio, "query").returns({
            findById: sandbox.stub().returns({
                id: 1,
                course_id: 1,
                instructor_id: 1,
                semester_term_id: 1,
                num_students: 10,
                section: 1,
                year: 2000
            })
        })
        
        // Act
        let output_test = await TestPortfolioController.getById(id)

        // Assert
        expect(output_test).to.deep.equal(output_expected)
    })

    it('inserts', async () => {
        // Arrange
        // course_id, instructor_id, semester_term_id, num_students, section, year
        const TestPortfolioController = new PortfolioController()
        let course_id = '1'
        let instructor_id = '1'
        let semester_term_id = '1'
        let num_students = '10'
        let section = '1'
        let year = '2000'

        expected_output = {
            id: 1,
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 10,
            section: 1,
            year: 2000
        }        

        sandbox.stub(Portfolio, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                course_id: 1,
                instructor_id: 1,
                semester_term_id: 1,
                num_students: 10,
                section: 1,
                year: 2000
            })
        })
        
        // Act
        let inserted = await TestPortfolioController.insert(course_id, instructor_id, semester_term_id, num_students, section, year)

        // Assert
        expect(inserted).to.deep.equal(expected_output) 
    })

    it('updates by id', async () => {
        // Arrange
        // course_id, instructor_id, semester_term_id, num_students, section, year
        const TestPortfolioController = new PortfolioController()
        let id = '1'
        let course_id = '1'
        let instructor_id = '1'
        let semester_term_id = '1'
        let num_students = '10'
        let section = '1'
        let year = '2000'

        expected_output = {
            id: 1,
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 10,
            section: 1,
            year: 2000
        }

        sandbox.stub(Portfolio, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: 1,
                course_id: 1,
                instructor_id: 1,
                semester_term_id: 1,
                num_students: 10,
                section: 1,
                year: 2000
            })
        })
        
        // Act
        let updated = await TestPortfolioController.updateById(id, course_id, instructor_id, semester_term_id, num_students, section, year)

        // Assert
        expect(updated).to.deep.equal(expected_output)  
    })

    it('delete by id', async () => {
        // Arrange
        let TestPortfolioController = new PortfolioController()
        let id = 1
        sandbox.stub(Portfolio, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let deleted = await TestPortfolioController.deleteById(id)

        // Assert
        expect(deleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestPortfolioController = new PortfolioController()
        let id = 404
        sandbox.stub(Portfolio, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let deleted = await TestPortfolioController.deleteById(id)

        // Assert
        expect(deleted).to.equal(false)

    })
})