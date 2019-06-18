exports.up = function(knex, Promise) {
    return knex.schema.createTable('tests', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.integer('total');
        table.string('code');
        table.integer('recruiters_id')
            .references('id')
            .inTable('recruiters')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tests');
};