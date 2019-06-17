exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { name: "Admin Smith", email: 'user@user.com', code: "password", recruiters_id: 1 },
                { name: "Jess Jones", email: 'Jess@jones.com', code: "pass", recruiters_id: 1 },
                { name: "Meryl Krich", email: 'meryl@smith.com', code: "pass", recruiters_id: 1 }
            ]);
        });
};