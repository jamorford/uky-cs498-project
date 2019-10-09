'use strict';

const { Model } = require('objection');

class Metric extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'slo_metric';
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
      required: ['name', 'exceeds', 'meets', 'partially', 'not'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'integer' },
        exceeds: { type: 'string' },
        meets: { type: 'string' },
        partially: { type: 'string' },
        not: { type: 'string' },
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const StudentLearningOutcome = require('./');

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: StudentLearningOutcome,
        join: {
          from: 'slo_metric.slo_id',
          to: 'slo.id'
        }
      }
    };
  }
}

module.exports = Metric;