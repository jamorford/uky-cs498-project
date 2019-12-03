const Course = require('../models/Course')
const Janitor = require('../../main/util/Janitor')
class CourseController {    

    // Generate query payload
    generateCoursePayload(department_id, course_number) {
        return {
            department_id: parseInt(department_id),
            number: parseInt(course_number)
        }
    }

    // Get a course
    async getByAttributes(department_id, course_number) {    
        return await Course
            .query()
            .where('department_id', parseInt(department_id))
            .where('number', parseInt(course_number))
    }

    async getById(id) {
        return await Course
            .query()
            .findById(id)
    }

    // Insert a course
    async insert(department_id, course_number) {
        var dep_id = this.sanitizeDeptId(department_id)
        var c_number = this.sanitizeNumber(course_number) 
        if (dep_id == null || c_number == null) {
            return null
        }   
        else { 
            return await Course
                .query()
                .insert(this.generateCoursePayload(department_id, course_number))
        }
    }    

    // Update a course
    async updateById(id, department_id, course_number) {
        return await Course
            .query()
            .patchAndFetchById(id, this.generateCoursePayload(department_id, course_number))
    }    

    // Delete a course
    async deleteByAttributes(department_id, course_number) {
        const numDeleted = await Course
            .query()
            .delete()
            .where('department_id', parseInt(department_id))
            .where('number', parseInt(course_number))
        
        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    async deleteById(id) {
        const numDeleted = await Course
            .query()
            .deleteById(id)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    // sanitize department_id attribute
    sanitizeDeptId(department_id) {
        var MAXINT = Math.pow(2, 31)-1     // variable to represent maximum SQL value for an int

        // method to check for non-empty input and valid integer
        var san_status
        if (Janitor.sanitizeInt(department_id) == null || Janitor.sanitizeInt(department_id) <= 0 || Janitor.sanitizeInt(department_id) > MAXINT) { // can this be 0?
            san_status = 0
        }
        else {
            san_status = Janitor.sanitizeInt(department_id)
        }
        return san_status
    }

    // sanitize number attribute
    sanitizeNumber(number) {
        var MAXINT = Math.pow(2, 31)-1     // variable to represent maximum SQL value for an int

        // method to check for non-empty input and valid integer
        var san_status
        if (Janitor.sanitizeInt(number) == null || Janitor.sanitizeInt(number) <= 0 || Janitor.sanitizeInt(number) > MAXINT) {
            san_status = 0
        }
        else {
            san_status = Janitor.sanitizeInt(number)
        }
        return san_status
    }
}

module.exports = CourseController
