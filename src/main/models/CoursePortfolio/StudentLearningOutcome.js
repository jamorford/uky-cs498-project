'use strict';

const { Model } = require('objection');

class CoursePortfolioStudentLearningOutcome extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'portfolio_slo';
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
				'portfolio_id',
				'slo_id'
			],

			properties: {
				id: { type: 'integer' },
				portfolio_id: { type: 'integer' },
				slo_id: { type: 'integer' }
			}
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const CoursePortfolio = require('.')
		const StudentLearningOutcome = require('../StudentLearningOutcome')
		const Artifact = require('./Artifact')

		return {
			owner: {
				relation: Model.BelongsToOneRelation,
				modelClass: CoursePortfolio,
				join: {
					from: 'portfolio_slo.portfolio_id',
					to: 'portfolio.id'
				}
			},
			slo: {
				relation: Model.HasOneRelation,
				modelClass: StudentLearningOutcome,
				join: {
					from: 'portfolio_slo.slo_id',
					to: 'slo.id'
				}
			},
			artifacts: {
				relation: Model.HasManyRelation,
				modelClass: Artifact,
				join: {
					from: 'portfolio_slo.id',
					to: 'artifact.portfolio_slo_id'
				}
			}
		};
	}
}

module.exports = CoursePortfolioStudentLearningOutcome;