'use strict';

const { Model } = require('objection');

class Department extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'department';
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
			required: ['identifier', 'name'],

			properties: {
				id: { type: 'integer' },
				identifier: { type: 'string' },
				name: { type: 'string' },
			}
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const Course = require('./Course');
		const StudentLearningOutcome = require('./StudentLearningOutcome')

		return {
			courses: {
				relation: Model.HasManyRelation,
				modelClass: Course,
				join: {
					from: 'department.id',
					to: 'course.department_id'
				}
			},
			student_learning_outcomes: {
				relation: Model.HasManyRelation,
				modelClass: StudentLearningOutcome,
				join: {
					from: 'department.id',
					to: 'slo.department_id'
				}
			}
		};
	}
}

module.exports = Department;