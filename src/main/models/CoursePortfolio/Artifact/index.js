'use strict';

const { Model } = require('objection');

class CoursePortfolioArtifact extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'artifact';
	}

	static get idColumn() {
		return 'id';
	}

	// Optional JSON schema. This is not the database schema! Nothing is generated
	// based on this. This is only used for validation. Whenever a model instance
	// is created it is checked against this schema. http://json-schema.org/.
	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'portfolio_slo_link_id',
				'index',
				'name'
			],

			properties: {
				id: { type: 'integer' },
				portfolio_slo_link_id: { type: 'integer' },
				index: { type: 'integer' },
				name: { type: 'string' }
			}
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const CoursePortfolioStudentLearningOutcome = require('../StudentLearningOutcome')
		const Evaluation = require('./Evaluation')

		return {
			owner: {
				relation: Model.BelongsToOneRelation,
				modelClass: CoursePortfolioStudentLearningOutcome,
				join: {
					from: 'artifact.portfolio_slo_id',
					to: 'portfolio_slo.id'
				}
			},
			evaluations: {
				relation: Model.HasManyRelation,
				modelClass: Evaluation,
				join: {
					from: 'artifact.id',
					to: 'artifact_evaluation.artifact_id'
				}
			}
		};
	}
}

module.exports = CoursePortfolioArtifact;