'use strict';

const { Model } = require('objection');

class TermType extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'term_type';
  }

  static get idColumn() {
    return 'type';
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
        type: { type: 'string' },
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Term = require('./Term');

    return {
      terms: {
        relation: Model.HasManyRelation,
        modelClass: Term,
        join: {
          from: 'term_type.id',
          to: 'term.type'
        }
      }
    };
  }
}

module.exports = TermType;