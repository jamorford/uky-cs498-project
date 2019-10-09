'use strict';

const { Model } = require('objection');

class Term extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'term';
  }

  static get idColumn() {
    return ['id'];
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
        type: { type: 'integer' },
        value: { type: 'string' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const TermType = require('./TermType');

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: TermType,
        join: {
          from: 'term.type',
          to: 'term_type.id'
        }
      }
    };
  }
}

module.exports = Term;