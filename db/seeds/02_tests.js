exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tests').del()
        .then(function() {
            // Inserts seed entries
            return knex('tests').insert([
                { name: "JavaScript", total: 5, recruiters_id: 1 },
                { name: "Java", total: 10, recruiters_id: 1 },
                { name: "Node.js", total: 5, recruiters_id: 1 },
            ]);
        });
};