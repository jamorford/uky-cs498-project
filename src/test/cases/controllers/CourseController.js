const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Course', () => {
    const CourseController = require('../../../main/controllers/CourseController')
    const Course = require('../../../main/models/Course')

    // this is ran after each unit test
    afterEach(() => {
        // this is needed to restore the CoursePortfolio model back to it's original state
        // we don't want to break all future unit tests
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        const TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'
        expected_payload = {
            department_id: 1,
            number: 101
        }
        // Act
        let payload = await TestCourseController.generateCoursePayload(department_id, course_number)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'
        let course_expected = {
            id: 1,
            department_id: 1,
            course_number: 101
        }

        sandbox.stub(Course, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    department_id: 1,
                    course_number: 101
                })
            })
        })
        
        // Act
        let course_retrieved = await TestCourseController.getByAttributes(department_id, course_number)

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })

    it('gets by id', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let id = 1
        let department_id = '1'
        let course_number = '101'
        let course_expected = {
            id: id,
            department_id: 1,
            course_number: 101
        }

        sandbox.stub(Course, "query").returns({
            findById: sandbox.stub().returns({
                id: id,
                department_id: 1,
                course_number: 101
            })
        })
        
        // Act
        let course_retrieved = await TestCourseController.getById(id)

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected) 
    })

    it('inserts', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'
        course_expected = {
            id: 1,
            department_id: 1,
            course_number: 101
        }        

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })

    it('updates by id', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let id = 1
        let department_id = '2'
        let course_number = '202'
        let course_expected = {
            id: id,
            department_id: 2,
            course_number: 202
        }

        sandbox.stub(Course, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: id,
                department_id: 2,
                course_number: 202
            })
        })
        
        // Act
        let course_retrieved = await TestCourseController.updateById(id, department_id, course_number)

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })

    it('delete by attributes', async () => {        
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'
        sandbox.stub(Course, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(1)
                })
            })
        })
        
        // Act
        let courseDeleted = await TestCourseController.deleteByAttributes(department_id, course_number)

        // Assert
        expect(courseDeleted).to.equal(true)
    })

    it('delete returns false if invalid attributes', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '-1'
        let course_number = '-1'
        sandbox.stub(Course, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(0)
                })
            })
        })

        // Act
        let courseDeleted = await TestCourseController.deleteByAttributes(department_id, course_number)

        // Assert
        expect(courseDeleted).to.equal(false)
    })

    it('delete by id', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let id = 1
        sandbox.stub(Course, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let courseDeleted = await TestCourseController.deleteById(id)

        // Assert
        expect(courseDeleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let id = 404
        sandbox.stub(Course, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let courseDeleted = await TestCourseController.deleteById(id)

        // Assert
        expect(courseDeleted).to.equal(false)

    })

    it('department_id sanitation with negative integer', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '-4'
        let course_number = '101'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: -4,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('department_id sanitation with empty input', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = ''
        let course_number = '101'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: department_id,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('department_id sanitation with integer at max SQL value', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        var t = Math.pow(2,31)
        let department_id = t.toString()
        let course_number = '101'   
        course_expected = {
            id: 1,
            department_id: department_id,
            course_number: 101
        }    

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: department_id,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })

    it('department_id sanitation with integer above max SQL value', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        var t = Math.pow(2,32)
        let department_id = t.toString()
        let course_number = '101'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: department_id,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
        
    })

    it('department_id sanitation with input as 0', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '0'
        let course_number = '101'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 0,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('department_id sanitation with valid input', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'  
        course_expected = {
            id: 1,
            department_id: 1,
            course_number: 101
        }     

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: 101
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })

    it('number sanitation with negative integer', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '-4'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: -4
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('number sanitation with empty input', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = ''       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: course_number
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('number sanitation with integer at max SQL value', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        var t = Math.pow(2, 31)-1
        let course_number = t.toString()
        let department_id = '1' 
        course_expected = {
            id: 1,
            department_id: 1,
            course_number: course_number
        }     

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: course_number
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
        
    })

    it('number sanitation with integer above max SQL value', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        var t = Math.pow(2, 32)
        let course_number = t.toString
        let department_id = '1'    

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: course_number
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)

        
    })

    it('number sanitation with input as 0', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '0'       

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: course_number
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(null)
    })

    it('number sanitation with valid input', async () => {
        // Arrange
        let TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'   
        course_expected = {
            id: 1,
            department_id: 1,
            course_number: course_number
        }    

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: 1,
                course_number: course_number
            })
        })
        
        // Act
        let course_inserted = await TestCourseController.insert(department_id, course_number)

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })
})
