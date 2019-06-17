exports.up = function(knex, Promise) {
    return knex.schema.createTable('questions', (table) => {
        table.increments('id').primary();
        table.string('question')
        table.integer('test_id')
            .references('id')
            .inTable('tests')
            .onDelete('CASCADE');
        table.string('correct');
        table.string('false_question_one');
        table.string('false_question_two');
        table.integer('recruiters_id')
            .references('id')
            .inTable('recruiters')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questions');
};