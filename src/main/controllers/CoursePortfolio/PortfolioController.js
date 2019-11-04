const Portfolio = require('../../models/CoursePortfolio/index.js')

class PortfolioController {

    // Used for insert statements
    generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year) {
        return {
            'course_id': parseInt(course_id), 
            'instructor_id': parseInt(instructor_id),
            'semester_term_id': parseInt(semester_term_id),
            'num_students': parseInt(num_students),
            'section': parseInt(section),
            'year': parseInt(year)
        }
    }

    async insert(course_id, instructor_id, semester_term_id, num_students, section, year) {
        return await Portfolio
            .query()
            .insert(this.generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year))
    }

    async getByAttributes(course_id, instructor_id, semester_term_id, num_students, section, year) {
        return await Portfolio
            .query()
            .where('course_id', parseInt(course_id))
            .where('instructor_id', parseInt(instructor_id))
            .where('semester_term_id', parseInt(semester_term_id))
            .where('num_students', parseInt(num_students))
            .where('section', parseInt(section))
            .where('year', parseInt(year))
    }

    async getById(id) {
        return await Portfolio
            .query()
            .findById(id)
    }

    async updateById(id, course_id, instructor_id, semester_term_id, num_students, section, year) {
        return await Portfolio
            .query()
            .patchAndFetchById(id, this.generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year))
    } 

    async deleteById(id) {
        const numDeleted = await Portfolio
            .query()
            .deleteById(id)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

}

module.exports = PortfolioController