exports.up = function(knex, Promise) {
    return knex.schema.createTable('patients', (table) => {
        table.increments('patient_id').primary();
        table.string('name');
        table.string('date');
        table.string('reason');
        table.text('details');
        table.integer('doctor_id');
        table.string('appointment_status');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('patients');
};