'use strict';

const { Model } = require('objection');

class CoursePortfolio extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'portfolio';
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
				'course_id',
				'instructor_id',
				'semester_term_id',
				'num_students',
				'section',
				'year'
			],

			properties: {
				id: { type: 'integer' },
				course_id: { type: 'integer' },
				instructor_id: { type: 'integer' },
				semester_term_id: { type: 'integer' },
				num_students: { type: 'integer' },
				section: { type: 'integer' },
				year: { type: 'integer' }
			}
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const Course = require('../Course')
		const User = require('../User')
		const Term = require('../Term')
		const StudentLearningOutcome = require('./StudentLearningOutcome')

		return {
			course: {
				relation: Model.BelongsToOneRelation,
				modelClass: Course,
				join: {
					from: 'portfolio.course_id',
					to: 'course.id'
				}
			},
			instructor: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'portfolio.instructor_id',
					to: 'users.id'
				}
			},
			semester: {
				relation: Model.HasOneRelation,
				modelClass: Term,
				join: {
					from: 'portfolio.semester_term_id',
					to: 'term.id'
				}
			},
			outcomes: {
				relation: Model.HasManyRelation,
				modelClass: StudentLearningOutcome,
				join: {
					from: 'portfolio.id',
					to: 'portfolio_slo.portfolio_id'
				}
			}
		};
	}
}

module.exports = CoursePortfolio;