exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('recruiters').del()
        .then(function() {
            // Inserts seed entries
            return knex('recruiters').insert([
                { name: "Galvanize Recruiter", email: 'admin@admin.com', password: "password" },
                { name: "Jess Jones", email: 'jess@jones.com', password: "pass" },
                { name: "James Smith", email: 'james@smith.com', password: "pass" }
            ]);
        });
};