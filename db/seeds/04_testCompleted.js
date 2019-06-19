exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tests_completed').del()
        .then(function() {
            // Inserts seed entries
            return knex('tests_completed').insert([
                { test_id: 1, user_id: 1, total: 5, correct: 4, completed: false, recruiters_id: 1 },
                { test_id: 2, user_id: 1, total: 10, correct: 4, completed: true, recruiters_id: 1 }
            ]);
        });
};
