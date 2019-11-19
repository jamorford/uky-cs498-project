
exports.up = function(knex) {
  return knex.schema.table('portfolio', function(t) {
    t.string('expireDate').notNull().defaultTo(Date.parse("January 1, 2020"));
  });
};

exports.down = function(knex) {
  return knex.schema.table('portfolio', function(t) {
    t.dropColumn('expireDate');
  });
};
