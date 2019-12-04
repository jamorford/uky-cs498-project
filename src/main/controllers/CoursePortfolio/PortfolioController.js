const Portfolio = require('../../models/CoursePortfolio/index.js');

class PortfolioController {
  // Used for insert statements
  generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year, expireDate) {
    return {
      'course_id': parseInt(course_id),
      'instructor_id': parseInt(instructor_id),
      'semester_term_id': parseInt(semester_term_id),
      'num_students': parseInt(num_students),
      'section': parseInt(section),
      'year': parseInt(year),
      'expireDate': expireDate,
    };
  }

  async insert(course_id, instructor_id, semester_term_id, num_students, section, year) {
    const expireDate = Date.parse('January 1, 2020'); // change expiration date to 2 weeks after finals using Date.parse
    return await Portfolio
        .query()
        .insert(this.generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year, expireDate));
  }

  async getByAttributes(course_id, instructor_id, semester_term_id, num_students, section, year) {
    return await Portfolio
        .query()
        .where('course_id', parseInt(course_id))
        .where('instructor_id', parseInt(instructor_id))
        .where('semester_term_id', parseInt(semester_term_id))
        .where('num_students', parseInt(num_students))
        .where('section', parseInt(section))
        .where('year', parseInt(year));
  }

  async getById(id) {
    return await Portfolio
        .query()
        .findById(id);
  }

  async updateById(id, course_id, instructor_id, semester_term_id, num_students, section, year) {
    return await Portfolio
        .query()
        .patchAndFetchById(id, this.generatePayload(course_id, instructor_id, semester_term_id, num_students, section, year));
  }

  async deleteById(id) {
    const numDeleted = await Portfolio
        .query()
        .deleteById(id);

    // Return true if a course is successfully deleted
    return numDeleted > 0;
  }

  // check if current date is past portfolio's expiration date
  checkDateStatus(expireDate) {
    let datestat = 1; // 1 means active, 0 means archived
    const d = new Date();
    const current = d.getTime();
    if (current < expireDate) {
      datestat = 1;
    } else {
      datestat = 0;
    }
    return datestat;
  }
}

module.exports = PortfolioController;
