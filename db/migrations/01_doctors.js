exports.up = function(knex, Promise) {
    return knex.schema.createTable('doctors', (table) => {
        table.increments('doc_id').primary();
        table.string('name');
        table.string('email').unique();
        table.text('bio');
        table.text('profile_picture');
        table.text('password');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('doctors');
};