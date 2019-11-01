const Course = require('../models/Course')

class CourseController {
    constructor(department_id, course_number) {
        // Attributes
        this.department_id = parseInt(department_id)
        this.course_number = parseInt(course_number)
        
        // Query for given attributes
        this.course_query = {
            department_id: this.department_id,
            number: this.course_number
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
        let course_exist = await this.get()
        console.log(course_exist)
        if (course_exist != []){
            return Course.query()
            .deleteById(course_exist[0].id)
        } else {
            return course_exist
        }
    }
}

module.exports = CourseController
