exports.up = function(knex, Promise) {
    return knex.schema.createTable('recruiters', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email').unique();
        table.text('password');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recruiters');
};