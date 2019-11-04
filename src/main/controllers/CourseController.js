const Course = require('../models/Course')

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
        return await Course
            .query()
            .insert(this.generateCoursePayload(department_id, course_number))
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
}

module.exports = CourseController
