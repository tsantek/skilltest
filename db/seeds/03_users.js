exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { name: "Admin Smith", email: 'user@user.com', password: "password" },
                { name: "Jess Jones", email: 'Jess@jones.com', password: "pass" },
                { name: "Meryl Krich", email: 'meryl@smith.com', password: "pass" }
            ]);
        });
};