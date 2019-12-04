const PortfolioSLO = require('../models/CoursePortfolio/StudentLearningOutcome');
const Janitor = require('../../main/util/Janitor');
class PortfolioSLOController {
  // Generate query payload
  generateCoursePayload(portfolio_id, slo_id) {
    return {
      portfolio_id: portfolio_id,
      slo_id: slo_id,
    };
  }

  // Get a course
  async getByAttributes(portfolio_id, slo_id) {
    const portid = this.sanitizePortfolioId(portfolio_id);
    var slo_id = this.sanitizeSLOId(slo_id);
    if (portid == null || slo_id == null) {
      return null;
    } else {
      return await PortfolioSLO
          .query()
          .where('portfolio_id', portid)
          .where('slo_id', slo_id);
    }
  }

  async getById(id) {
    const sanitized = Janitor.sanitizeInt(id);
    if (sanitized == null || sanitized <= 0) {
      return null;
    } else {
      return await PortfolioSLO
          .query()
          .findById(sanitized);
    }
  }

  // Insert a course
  async insert(portfolio_id, slo_id) {
    const portid = this.sanitizePortfolioId(portfolio_id);
    const sid = this.sanitizeSLOId(slo_id);
    if (portid == null || sid == null) {
      return null;
    } else {
      return await PortfolioSLO
          .query()
          .insert(this.generateCoursePayload(portid, sid));
    }
  }

  // Update a course
  async updateById(id, portfolio_id, slo_id) {
    const portid = this.sanitizePortfolioId(portfolio_id);
    const sid = this.sanitizeSLOId(slo_id);
    const checkid = Janitor.sanitizeInt(id);
    if (checkid == null || portid == null || sid == null) {
      return null;
    } else {
      return await PortfolioSLO
          .query()
          .patchAndFetchById(checkid, this.generateCoursePayload(portid, sid));
    }
  }

  // Delete a course
  async deleteByAttributes(portfolio_id, slo_id) {
    const portid = this.sanitizePortfolioId(portfolio_id);
    const sid = this.sanitizeSLOId(slo_id);
    if (portid == null || sid == null) {
      return null;
    } else {
      const numDeleted = await PortfolioSLO
          .query()
          .delete()
          .where('portfolio_id', portid)
          .where('slo_id', sid);

      return numDeleted > 0;
    }
    // Return true if a course is successfully deleted
  }

  async deleteById(id) {
    const sanitized = Janitor.sanitizeInt(id);
    if (sanitized == null || sanitized <= 0) {
      return null;
    } else {
      const numDeleted = await PortfolioSLO
          .query()
          .deleteById(sanitized);

      return numDeleted > 0;
    }
    // Return true if a course is successfully deleted
  }

  // sanitize portfolio_id attribute
  sanitizePortfolioId(portfolio_id) {
    const MAXINT = Math.pow(2, 31)-1; // variable to represent maximum value for a SQL int

    // method to check for non-empty input and valid integer
    let san_status;
    const sanitized = Janitor.sanitizeInt(portfolio_id);
    if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) {
      san_status = null;
    } else {
      san_status = sanitized;
    }
    return san_status; // null means invalid input, else means sanitation is successful
  }

  // sanitize slo_id attribute
  sanitizeSLOId(slo_id) {
    const MAXINT = Math.pow(2, 31)-1; // variable to represent maximum value for a SQL int

    // method to check for non-empty input and valid integer
    let san_status;
    const sanitized = Janitor.sanitizeInt(slo_id);
    if (sanitized == null || sanitized <= 0 || sanitized > MAXINT) {
      san_status = null;
    } else {
      san_status = sanitized;
    }
    return san_status; // null means invalid input, else means sanitation is successful
  }
}

module.exports = PortfolioSLOController;
