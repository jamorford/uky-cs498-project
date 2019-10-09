'use strict';

const { Model } = require('objection');

class CoursePortfolioArtifactEvaluation extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'artifact_evaluation';
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
        'artifact_id',
        'evaluation_index',
        'student_index'
      ],

      properties: {
        id: { type: 'integer' },
        artifact_id: { type: 'integer' },
        evaluation_index: { type: 'integer' },
        student_index: { type: 'integer' },
        evaluation: { type: 'string' },
        file: { type: 'string' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Artifact = require('.')

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artifact,
        join: {
          from: 'artifact_evaluation.artifact_id',
          to: 'artifact.id'
        }
      }
    };
  }
}

module.exports = CoursePortfolioArtifactEvaluation;