const Course = require('../models/Course');
const Janitor = require('../../main/util/Janitor');
class CourseController {
  // Generate query payload
  generateCoursePayload(department_id, course_number) {
    return {
      department_id: department_id,
      number: course_number,
    };
  }

  // Get a course
  async getByAttributes(department_id, course_number) {
    const deptid = this.sanitizeDeptId(department_id);
    const cid = this.sanitizeNumber(course_number);
    if (deptid == null || cid == null) {
      return null;
    } else {
      return await Course
          .query()
          .where('department_id', deptid)
          .where('number', cid);
    }
  }

  async getById(id) {
    const sanitized = Janitor.sanitizeInt(id);
    if (sanitized == null || sanitized <= 0) {
      return null;
    } else {
      return await Course
          .query()
          .findById(sanitized);
    }
  }

  // Insert a course
  async insert(department_id, course_number) {
    const dep_id = this.sanitizeDeptId(department_id);
    const c_number = this.sanitizeNumber(course_number);
    if (dep_id == null || c_number == null) {
      return null;
    } else {
      return await Course
          .query()
          .insert(this.generateCoursePayload(dep_id, c_number));
    }
  }

  // Update a course
  async updateById(id, department_id, course_number) {
    const sanitized = Janitor.sanitizeInt(id);
    const deptid = this.sanitizeDeptId(department_id);
    const cid = this.sanitizeNumber(course_number);
    if (sanitized == null || sanitized <= 0 || deptid == null || cid == null) {
      return null;
    } else {
      return await Course
          .query()
          .patchAndFetchById(sanitized, this.generateCoursePayload(deptid, cid));
    }
  }

  // Delete a course
  async deleteByAttributes(department_id, course_number) {
    const deptid = this.sanitizeDeptId(department_id);
    const cid = this.sanitizeNumber(course_number);
    if (deptid == null || cid == null) {
      return null;
    } else {
      const numDeleted = await Course
          .query()
          .delete()
          .where('department_id', deptid)
          .where('number', cid);

      return numDeleted > 0;
    }
    // Return true if a course is successfully deleted
  }

  async deleteById(id) {
    const sanitized = Janitor.sanitizeInt(id);
    if (sanitized == null || sanitized <= 0) {
      return null;
    } else {
      const numDeleted = await Course
          .query()
          .deleteById(sanitized);

      return numDeleted > 0;
    }
    // Return true if a course is successfully deleted
  }

  // sanitize department_id attribute
  sanitizeDeptId(department_id) {
    const MAXINT = Math.pow(2, 31)-1; // variable to represent maximum SQL value for an int

    // method to check for non-empty input and valid integer
    let san_status;
    const sanitized = Janitor.sanitizeInt(department_id);
    if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) { // can this be 0?
      san_status = null;
    } else {
      san_status = sanitized;
    }
    return san_status;
  }

  // sanitize number attribute
  sanitizeNumber(number) {
    const MAXINT = Math.pow(2, 31)-1; // variable to represent maximum SQL value for an int

    // method to check for non-empty input and valid integer
    let san_status;
    const sanitized = Janitor.sanitizeInt(number);
    if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) {
      san_status = null;
    } else {
      san_status = sanitized;
    }
    return san_status;
  }
}

module.exports = CourseController;
