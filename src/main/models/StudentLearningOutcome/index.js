'use strict';

const { Model } = require('objection');

class StudentLearningOutcome extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'slo';
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
      required: ['type'],

      properties: {
        id: { type: 'integer' },
        index: { type: 'integer' },
        description: { type: 'string' },
        student_learning_objective_metric: { type: 'json' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Metric = require('./Metric');

    return {
      metrics: {
        relation: Model.HasManyRelation,
        modelClass: Metric,
        join: {
          from: 'slo.id',
          to: 'slo_metric.slo_id'
        }
      }
    };
  }
}

module.exports = StudentLearningOutcome;