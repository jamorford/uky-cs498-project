exports.up = (knex) => {
  return knex.schema.table('portfolio', function(table) {
    table.dropUnique('course_id', 'section', 'semester_term_id', 'year');
    table.unique(['course_id', 'section', 'semester_term_id', 'year']);
  });
};

exports.down = (knex) => {
  return knex.schema
      .dropTableIfExists('artifact_evaluation')
      .dropTableIfExists('artifact')
      .dropTableIfExists('portfolio_slo')
      .dropTableIfExists('portfolio')
      .dropTableIfExists('course')
      .dropTableIfExists('slo_metric')
      .dropTableIfExists('slo')
      .dropTableIfExists('users')
      .dropTableIfExists('term')
      .dropTableIfExists('term_type')
      .dropTableIfExists('department');
};
