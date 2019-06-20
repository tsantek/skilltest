exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email').unique();
        table.string('location');
        table.string('bio');
        table.specificType('notes', 'json[]');
        table.integer('recruiters_id')
            .references('id')
            .inTable('recruiters')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};