const common = {
	client: 'postgresql',
	migrations: {
		directory: './src/main/migrations'
	},
	pool: {
		min: 2,
		max: 10
	}
}

module.exports = {
  development: Object.assign({
    connection: {
      database: 'abet_system_dev'
    },
    seeds: {
      directory: './src/dev/seeds'
    }
	}, common),

  test: Object.assign({
    connection: {
      database: 'abet_system_test'
    },
    seeds: {
      directory: './src/test/seeds'
    }
  }, common),

  production: Object.assign({
    connection: {
      database: 'abet_system'
    }
  }, common)
};