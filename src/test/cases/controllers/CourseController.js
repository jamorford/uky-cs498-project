const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Course', () => {
    const CourseController = require('../../../main/controllers/CourseController')

    // this is ran after each unit test
    afterEach(() => {
        // this is needed to restore the CoursePortfolio model back to it's original state
        // we don't want to break all future unit tests
        sandbox.restore()
    })

    it('constructor', () => {
        // Arrange
        const CourseController = require('../../../main/controllers/CourseController')
        department_id = '1'
        course_number = '101'
        expected_department_id = 1
        expected_course_number = 101
        expected_course_query = {
            department_id: parseInt(department_id),
            number: parseInt(course_number)
        } 

        // Act
        let TestCourseController = new CourseController(department_id, course_number)
        
        // Assert
        expect(TestCourseController.course_query).to.deep.equal(expected_course_query)
        expect(TestCourseController.department_id).to.equal(expected_department_id)
        expect(TestCourseController.course_number).to.equal(expected_course_number)
    })

    it('insert', async () => {
        // Arrange
        const CourseController = require('../../../main/controllers/CourseController')
        const Course = require('../../../main/models/Course')
        let department_id = '1'
        let course_number = '101'
        course_expected = {
            id: 1,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }        

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: parseInt(department_id),
                course_number: parseInt(course_number)
            })
        })

        let TestCourseController = new CourseController(department_id, course_number)
        
        // Act
        let course_inserted = await TestCourseController.insert()

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })

    it('get', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '1'
        let course_number = '101'
        let course_expected = {
            id: 1,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }

        sandbox.stub(Course, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    department_id: parseInt(department_id),
                    course_number: parseInt(course_number)
                })
            })
        })

        let TestCourseController = new CourseController(department_id, course_number)
        
        // Act
        let course_retrieved = await TestCourseController.get()

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })
    
    it('update', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '2'
        let course_number = '202'
        let course_expected = {
            id: 2,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }

        sandbox.stub(Course, "query").returns({
            patch: sandbox.stub().returns({
                id: 2,
                department_id: parseInt(department_id),
                course_number: parseInt(course_number)
            })
        })

        let TestCourseController = new CourseController(department_id, course_number)
        
        // Act
        let course_retrieved = await TestCourseController.update()

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })
    
    it('don\'t delete if empty', async () => {        
        // Arrange
        const Course = require('../../../main/models/Course')
        let invalid_department_id = '404'
        let invalid_course_number = '404'
        sandbox.stub(Course, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns([])
            })
        })

        let TestCourseController = new CourseController(invalid_department_id, invalid_course_number)

        // Act
        let course_retrieved = await TestCourseController.delete()

        // Assert
        expect(course_retrieved).to.deep.equal([])  
    })
})