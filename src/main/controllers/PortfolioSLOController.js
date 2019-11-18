const PortfolioSLO = require('../models/CoursePortfolio/StudentLearningOutcome')

class PortfolioSLOController {    

    // Generate query payload
    generateCoursePayload(portfolio_id, slo_id, expireDate) {
        return {
            portfolio_id: parseInt(portfolio_id),
            slo_id: parseInt(slo_id),
            expireDate: expireDate
        }
    }

    // Get a course
    async getByAttributes(portfolio_id, slo_id) {    
        return await PortfolioSLO
            .query()
            .where('portfolio_id', parseInt(portfolio_id))
            .where('slo_id', parseInt(slo_id))
            //.where('expireDate', expireDate)
    }

    async getById(id) {
        return await PortfolioSLO
            .query()
            .findById(id)
    }

    // Insert a course
    async insert(portfolio_id, slo_id) {
        var expireDate = Date.parse("January 1, 2020")      // change expiration date to 2 weeks after finals using Date.parse
        return await PortfolioSLO
            .query()
            .insert(this.generateCoursePayload(portfolio_id, slo_id, expireDate))
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

    // check if current date is past portfolio's expiration date
    checkDateStatus(portfolio_id, slo_id, expireDate) {
        var datestat = 1          // 1 means active, 0 means archived
        //t = PortfolioSLOController.getByAttributes(portfolio_id, slo_id, expireDate)

        var d = new Date()
        var current = d.getTime()
        if (current < expireDate) {
            datestat = 1
        }
        else {
            datestat = 0
        }
        return datestat
    }
}

module.exports = PortfolioSLOController