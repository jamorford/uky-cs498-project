'use strict';

const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'linkblue_username';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['linkblue_username'],

      properties: {
        id: { type: 'integer' },
        linkblue_username: { type: 'string' },
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {


    return {
    };
  }
}

module.exports = User;