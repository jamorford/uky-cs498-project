const PortfolioSLO = require('../models/CoursePortfolio/StudentLearningOutcome')

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
}

module.exports = PortfolioSLOController