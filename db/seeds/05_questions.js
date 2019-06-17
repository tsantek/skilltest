exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('questions').del()
        .then(function() {
            // Inserts seed entries
            return knex('questions').insert([{
                question: "[] is ",
                test_id: 1,
                correct: "String",
                false_question_one: "Object",
                false_question_two: "Array",
                recruiters_id: 1
            }, {
                question: "What is {}",
                test_id: 1,
                correct: "Array",
                false_question_one: "Object",
                false_question_two: "String",
                recruiters_id: 1
            }]);
        });
};