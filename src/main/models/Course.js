'use strict';

const { Model } = require('objection');

class Course extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'course';
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
      required: ['department_id', 'number'],

      properties: {
        id: { type: 'integer' },
        department_id: { type: 'integer' },
        number: { type: 'integer' },
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Department = require('./Department');

    return {
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: 'course.department_id',
          to: 'department.id'
        }
      }
    };
  }
}

module.exports = Course;