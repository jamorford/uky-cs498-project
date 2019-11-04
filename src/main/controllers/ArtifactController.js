const Artifact = require('../models/CoursePortfolio/Artifact')

class ArtifactController {
    constructor(portfolio_slo_id, index, name) {
        // Attributes
        this.portfolio_slo_id = portfolio_slo_id
        this.index = index
        this.name = name

        // query for attributes
        this.artifact_query = {
            portfolio_slo_id: parseInt(this.portfolio_slo_id),
            index: parseInt(this.index),
            name: name
        }
    }

    // get new artifact
    async get() {
        return Artifact
        .query()
        .where('porfolio_slo_id', this.portfolio_slo_id)
        .where('index', this.index)
        .where('name', this.name)
    }

    // insert an artifact
    async insert() {
        return Artifact
        .query()
        .insert(this.artifact_query)
    }

    // update an artifact
    async update() {
        return Artifact
        .query()
        .patch(this.artifact_query)
    }

    // delete an artifact
    async delete() {
        artifact_exist = await this.get()
        if (artifact_exist != []) {
            Artifact.query()
            .deleteById(artifact_exist[0].id)
        }
    }
}

module.exports = ArtifactController