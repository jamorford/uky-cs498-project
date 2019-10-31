const Course = require('../models/Course')

class CourseController {
    constructor(department_id, course_number) {
        // Attributes
        this.department_id = department_id
        this.course_number = course_number
        
        // Query for given attributes
        this.course_query = {
            department_id: parseInt(this.department_id),
            number: parseInt(this.course_number)
        }
    }

    // Get a course
    async get() {    
        return Course
            .query()
            .where('department_id', this.department_id)
            .where('number', this.course_number)
    }

    // Insert a course
    async insert() {     
        return Course
            .query()
            .insert(this.course_query)
    }    

    // Update a course
    async update() {     
        return Course
            .query()
            .patch(this.course_query)
    }    

    // Delete a course
    async delete() {
        course_exist = await this.get()
        if (course_exist != []){
            Course.query()
            .deleteById(course_exist[0].id)
        }
    }
}

module.exports = CourseController
