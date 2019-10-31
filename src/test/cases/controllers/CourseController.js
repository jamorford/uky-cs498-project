const { expect } = require('../../chai')
const sinon = require('sinon')

describe('Controller - Course', () => {
    const CourseController = require('../../../main/controllers/CourseController')

    it('insert', async () => {
        // Arrange
        let department_id = '101'
        let course_number = '1'
        let TestCourseController = new CourseController(department_id, course_number)
        let expected_course = {
            department_id: 101,
            course_number: 1
        }

        // Act
        let course_inserted = await TestCourseController.insert()

        // Assert
        expect(course_inserted).to.deep.equal(expected_course)

    })

    it('get', async () => {
        // Arrange
        let department_id = '101'
        let course_number = '1'
        let TestCourseController = new CourseController(department_id, course_number)
        let expected_course = {
            department_id: 101,
            course_number: 1
        }

        // Act
        let course_inserted = await TestCourseController.get()

        // Assert
        expect(course_inserted).to.deep.equal(expected_course)    
    })
    
    it('update', () => {
        expect(true)
    })
    it('delete', () => {
        expect(true)
    })
})