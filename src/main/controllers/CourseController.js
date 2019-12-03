const Course = require('../models/Course')
const Janitor = require('../../main/util/Janitor')
class CourseController {    

    // Generate query payload
    generateCoursePayload(department_id, course_number) {
        return {
            department_id: Janitor.parseIntHandler(department_id),
            number: Janitor.parseIntHandler(course_number)
        }
    }

    // Get a course
    async getByAttributes(department_id, course_number) {  
        var deptid = this.sanitizeDeptId(department_id)
        var cid = this.sanitizeNumber(course_number)
        if (deptid == null || cid == null) {
            return null
        }  
        else {
            return await Course
                .query()
                .where('department_id', parseInt(department_id))
                .where('number', parseInt(course_number))
        }
    }

    async getById(id) {
        var sanitized = Janitor.sanitizeInt(id)
        if (sanitized == null || sanitized <= 0) {
            return null
        }
        else {
            return await Course
                .query()
                .findById(id)
        }
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
        var sanitized = Janitor.sanitizeInt(id)
        var deptid = this.sanitizeDeptId(department_id)
        var cid = this.sanitizeNumber(course_number)
        if (sanitized == null || sanitized <= 0 || deptid == null || cid == null) {
            return null
        }
        else {
            return await Course
                .query()
                .patchAndFetchById(id, this.generateCoursePayload(department_id, course_number))
        }
    }    

    // Delete a course
    async deleteByAttributes(department_id, course_number) {
        var deptid = this.sanitizeDeptId(department_id)
        var cid = this.sanitizeNumber(course_number)
        if (deptid == null || cid == null) {
            return null
        }
        else {
            const numDeleted = await Course
                .query()
                .delete()
                .where('department_id', parseInt(department_id))
                .where('number', parseInt(course_number))
            
            return numDeleted > 0
        }
        // Return true if a course is successfully deleted
    }

    async deleteById(id) {
        var sanitized = Janitor.sanitizeInt(id)
        if (sanitized == null || sanitized <= 0) {
            return null
        }
        else {
            const numDeleted = await Course
                .query()
                .deleteById(id)

            return numDeleted > 0
        }
        // Return true if a course is successfully deleted
    }

    // sanitize department_id attribute
    sanitizeDeptId(department_id) {
        var MAXINT = Math.pow(2, 31)-1     // variable to represent maximum SQL value for an int

        // method to check for non-empty input and valid integer
        var san_status
        var sanitized = Janitor.sanitizeInt(department_id)
        if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) { // can this be 0?
            san_status = null
        }
        else {
            san_status = sanitized
        }
        return san_status
    }

    // sanitize number attribute
    sanitizeNumber(number) {
        var MAXINT = Math.pow(2, 31)-1     // variable to represent maximum SQL value for an int

        // method to check for non-empty input and valid integer
        var san_status
        var sanitized = Janitor.sanitizeInt(number)
        if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) {
            san_status = null
        }
        else {
            san_status = sanitized
        }
        return san_status
    }
}

module.exports = CourseController