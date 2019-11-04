const Artifact = require('../models/CoursePortfolio/Artifact')

class ArtifactController {
    // Generate query payload
    generateArtifactPayload(portfolio_slo_id, index, name){
        return {
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }
    }

    // get new artifact
    async getByAttributes(portfolio_slo_id, index, name) {
        return Artifact
        .query()
        .where('porfolio_slo_id', parseInt(portfolio_slo_id))
        .where('index', parseInt(index))
        .where('name', name)
    }

    async getById(id) {
        return Artifact
        .query()
        .findById(id)
    }

    // insert an artifact
    async insert() {
        return Artifact
        .query()
        .insert(this.artifact_query)
    }

    // update an artifact
    async updateById(id, portfolio_slo_id, index, name) {
        return Artifact
        .query()
        .patchAndFetchById(id, portfolio_slo_id, index, name)
    }

    // delete an artifact
    async deleteById(id) {
        const numDeleted = await Artifact
            .query()
            .deleteById(id)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    // Delete a course
    async deleteByAttributes(portfolio_slo_id, index, name) {
        const numDeleted = await Artifact
            .query()
            .delete()
            .where('portfolio_slo_id', parseInt(portfolio_slo_id))
            .where('index', parseInt(index))
            .where('name', parseInt(name))

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }
}

module.exports = ArtifactController