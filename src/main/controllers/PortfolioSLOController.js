const PortfolioSLO = require('../models/CoursePortfolio/StudentLearningOutcome')
const Janitor = require('../../main/util/Janitor')
class PortfolioSLOController {    

    // Generate query payload
    generateCoursePayload(portfolio_id, slo_id) {
        return {
            portfolio_id: parseInt(portfolio_id),
            slo_id: parseInt(slo_id)
        }
    }

    // Get a course
    async getByAttributes(portfolio_id, slo_id) {    
        return await PortfolioSLO
            .query()
            .where('portfolio_id', parseInt(portfolio_id))
            .where('slo_id', parseInt(slo_id))
    }

    async getById(id) {
        return await PortfolioSLO
            .query()
            .findById(id)
    }

    // Insert a course
    async insert(portfolio_id, slo_id) {     
        return await PortfolioSLO
            .query()
            .insert(this.generateCoursePayload(portfolio_id, slo_id))
    }    

    // Update a course
    async updateById(id, portfolio_id, slo_id) {
        return await PortfolioSLO
            .query()
            .patchAndFetchById(id, this.generateCoursePayload(portfolio_id, slo_id))
    }    

    // Delete a course
    async deleteByAttributes(portfolio_id, slo_id) {
        const numDeleted = await PortfolioSLO
            .query()
            .delete()
            .where('portfolio_id', parseInt(portfolio_id))
            .where('slo_id', parseInt(slo_id))
        
        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    async deleteById(id) {
        const numDeleted = await PortfolioSLO
            .query()
            .deleteById(id)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    // sanitize portfolio_id attribute
    sanitizePortfolioId(portfolio_id) {
        var MAXINT = Math.pow(2,31)         // variable to represent maximum value for a SQL int

        // method to check for non-empty input and valid integer
        var san_status
        if (Janitor.sanitizeInt(portfolio_id) == null || Janitor.sanitizeInt(portfolio_id) <= 0 || Janitor.sanitizeInt(portfolio_id) > MAXINT) {
            san_status = 0
        }
        else {
            san_status = 1
        }
        return san_status       // 0 means invalid input, 1 means sanitation is successful
    }

    // sanitize slo_id attribute
    sanitizeSLOId(slo_id) {
        var MAXINT = Math.pow(2,31)         // variable to represent maximum value for a SQL int
        
        // method to check for non-empty input and valid integer
        var san_status
        if (Janitor.sanitizeInt(slo_id) == null || Janitor.sanitizeInt(slo_id) <= 0 || Janitor.sanitizeInt(slo_id) > MAXINT) {
            san_status = 0
        }
        else {
            san_status = 1
        }
        return san_status       // 0 means invalid input, 1 means sanitation is successful
    }
}

module.exports = PortfolioSLOController