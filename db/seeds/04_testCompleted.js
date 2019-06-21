exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tests_completed').del()
        .then(function() {
            // Inserts seed entries
            return knex('tests_completed').insert([
                { test_id: 1, user_id: 1, total: 10, correct: 7, completed: true, recruiters_id: 1 },
                { test_id: 2, user_id: 1, total: 10, correct: 8, completed: true, recruiters_id: 1 },
                { test_id: 3, user_id: 1, total: 10, correct: 10, completed: true, recruiters_id: 1 },
                { test_id: 4, user_id: 1, total: 10, correct: 4, completed: true, recruiters_id: 1 },
                { test_id: 5, user_id: 1, total: 10, correct: 3, completed: true, recruiters_id: 1 },
                { test_id: 1, user_id: 2, total: 10, correct: 8, completed: true, recruiters_id: 1 },
                { test_id: 2, user_id: 2, total: 10, correct: 9, completed: true, recruiters_id: 1 },
                { test_id: 3, user_id: 2, total: 10, correct: 4, completed: true, recruiters_id: 1 },
                { test_id: 4, user_id: 3, total: 10, correct: 9, completed: true, recruiters_id: 1 },
                { test_id: 5, user_id: 3, total: 10, correct: 9, completed: true, recruiters_id: 1 },
                { test_id: 1, user_id: 4, total: 10, correct: 6, completed: true, recruiters_id: 1 },
                { test_id: 2, user_id: 4, total: 10, correct: 2, completed: true, recruiters_id: 1 },
                { test_id: 3, user_id: 4, total: 10, correct: 9, completed: true, recruiters_id: 1 },
                { test_id: 4, user_id: 4, total: 10, correct: 5, completed: true, recruiters_id: 1 },
                { test_id: 5, user_id: 5, total: 10, correct: 6, completed: true, recruiters_id: 1 },
                { test_id: 1, user_id: 5, total: 10, correct: 6, completed: true, recruiters_id: 1 },
                { test_id: 2, user_id: 5, total: 10, correct: 9, completed: true, recruiters_id: 1 },
                { test_id: 3, user_id: 5, total: 10, correct: 3, completed: true, recruiters_id: 1 },
                { test_id: 4, user_id: 5, total: 10, correct: 5, completed: true, recruiters_id: 1 },
                { test_id: 5, user_id: 5, total: 10, correct: 7, completed: true, recruiters_id: 1 }
            ]);
        });
};
