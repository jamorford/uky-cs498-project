/*
 * this file ensures that everything is set up for objection to work
 */
const knex = require('knex');
const { Model } = require('objection');

const config = require('../../../knexfile');

// Initialize knex.
const knex_instance = knex(config.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex_instance);