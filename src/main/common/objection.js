/*
 * this file ensures that everything is set up for objection to work
 */
const knex = require('knex')
const { Model } = require('objection')

const config = require('../../../knexfile')

// Initialize knex.
var knex_instance = null
switch(process.env.NODE_ENV) {
	case 'test':
		knex_instance = knex(config.test)
		break
	case 'production':
		knex_instance = knex(config.production)
		break
	default:
		knex_instance = knex(config.development)
		break
}

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex_instance)