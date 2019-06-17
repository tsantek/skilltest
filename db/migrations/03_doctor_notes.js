exports.up = function(knex, Promise) {
    return knex.schema.createTable('doctor_notes', (table) => {
        table.increments('id').primary();
        table.integer('pat_id')
            .references('patient_id')
            .inTable('patients')
            .onDelete('CASCADE');
        table.text('note');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('doctor_notes');
};