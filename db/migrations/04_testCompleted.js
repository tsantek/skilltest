exports.up = function(knex, Promise) {
    return knex.schema.createTable('tests_completed', (table) => {
        table.increments('id').primary();
        table.integer('test_id')
            .references('id')
            .inTable('tests')
            .onDelete('CASCADE');
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.integer('total');
        table.integer('correct');
        table.integer('recruiters_id')
            .references('id')
            .inTable('recruiters')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tests_completed');
};