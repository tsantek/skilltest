exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('recruiters').del()
        .then(function() {
            // Inserts seed entries
            return knex('recruiters').insert([
                { name: "Admin Smith", email: 'admin@admin.com', password: "password" },
                { name: "Jess Jones", email: 'james@smith.com', password: "pass" },
                { name: "Meryl Krich", email: 'james@smith.com', password: "pass" }
            ]);
        });
};