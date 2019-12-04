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
      database: 'abet_system_dev',
      host : '127.0.0.1',
      user: 'postgres',
      password: 'password'
    },
    seeds: {
      directory: './src/dev/seeds'
    }
	}, common),

  test: Object.assign({
    connection: {
      database: 'abet_system_test',
      host : '127.0.0.1',
      user: 'postgres',
      password: 'password'
    },
    seeds: {
      directory: './src/test/seeds'
    }
  }, common),

  production: Object.assign({
    connection: {
      database: 'abet_system',
      host : '127.0.0.1',
      user: 'postgres',
      password: 'password'
    }
  }, common)
};