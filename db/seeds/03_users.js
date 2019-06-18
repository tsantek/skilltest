exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { name: "User Jess", email: 'user@user.com', code: "password", recruiters_id: 1 },
                { name: " User John ", email: 'Jess@jones.com', code: "pass", recruiters_id: 1 },
                { name: "User Smith", email: 'meryl@smith.com', code: "pass", recruiters_id: 1 }
            ]);
        });
};