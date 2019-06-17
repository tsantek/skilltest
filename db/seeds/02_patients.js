exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('patients').del()
        .then(function() {
            // Inserts seed entries
            return knex('patients').insert([
                { name: "Austin Gilbert", reason: 'Feeling Sick', date: "12/12/2019", details: "I've been coughing every few minutes", doctor_id: 1, appointment_status: "unconfirmed" },
                { name: "Nick D'Errico", reason: 'Injury', date: "12/10/2019", details: "I'm loosing ti troy in ping pong and I got injured while trying to keep up with his level", doctor_id: 2, appointment_status: "confirmed" },
                { name: "Gabe Tracer", reason: 'Basketball Injury', date: "10/12/2019", details: "I think I injured my anckle yesterday", doctor_id: 2, appointment_status: "complited" },
                { name: "Sombra", reason: 'Wrist Pain', date: "11/12/2019", details: "Injury playing overwatch", doctor_id: 3, appointment_status: "complited" }
            ]);
        });
};