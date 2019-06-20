exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('questions').del()
        .then(function() {
            // Inserts seed entries
            return knex('questions').insert([{
                question: "[] represents a(n) ",
                test_id: 1,
                correct: "Array",
                false_question_one: "Object",
                false_question_two: "String",
                recruiters_id: 1
            }, {
                question: "{} represents a(n)",
                test_id: 1,
                correct: "Object",
                false_question_one: "Array",
                false_question_two: "String",
                recruiters_id: 1
            }, {
                question: "Are Javascript and Java the same thing?",
                test_id: 1,
                correct: "No",
                false_question_one: "Yes",
                false_question_two: "Kinda",
                recruiters_id: 1
            }, {
                question: "Where should you include your script tag?",
                test_id: 1,
                correct: "at the bottom of the body",
                false_question_one: "in a separate file",
                false_question_two: "under your dresser",
                recruiters_id: 1
            }, {
                question: "It is always safe to use a while loop without iterating",
                test_id: 1,
                correct: "No",
                false_question_one: "Yes",
                false_question_two: "IDK, wbu?",
                recruiters_id: 1
            }, {
                question: "An older developer is called:",
                test_id: 1,
                correct: "a scryptkeeper",
                false_question_one: "Bob",
                false_question_two: "Danged Millenials",
                recruiters_id: 1
            }, {
                question: "How much caffeine does it take to code?",
                test_id: 1,
                correct: "You should be almost dead from caffeine",
                false_question_one: "none, who needs it?",
                false_question_two: "zzzzzzzzz",
                recruiters_id: 1
            }, {
                question: "I don't gotta dance",
                test_id: 1,
                correct: "I make money moves",
                false_question_one: "Friday",
                false_question_two: "I broke my ankle",
                recruiters_id: 1
            }, {
                question: "Javascript should be:",
                test_id: 1,
                correct: "Eloquent",
                false_question_one: "Confusing",
                false_question_two: "Offensive",
                recruiters_id: 1
            }, {
                question: "y tho?",
                test_id: 1,
                correct: "shrug",
                false_question_one: "because!",
                false_question_two: "Does any of this really matter?",
                recruiters_id: 1
            }, {
                question: "Is Node.js fun?",
                test_id: 2,
                correct: "duh",
                false_question_one: "I wouldn't say fun",
                false_question_two: "maybe",
                recruiters_id: 1
            }, {
                question: "What does the .js stand for in Node.js",
                test_id: 2,
                correct: "JavaScript",
                false_question_one: "Just Sassy",
                false_question_two: "Jump Scare",
                recruiters_id: 1
            }, {
                question: "Which of these is a node?",
                test_id: 2,
                correct: "none of these",
                false_question_one: "Winnie the Pooh",
                false_question_two: "Argentina",
                recruiters_id: 1
            }, {
                question: "Yesde.js?",
                test_id: 2,
                correct: "No",
                false_question_one: "maybe",
                false_question_two: "I don't understand",
                recruiters_id: 1
            }, {
                question: "What is your favorite thing about coding?",
                test_id: 2,
                correct: "All of it!",
                false_question_one: "the eye strain",
                false_question_two: "probably the natural lighting",
                recruiters_id: 1
            }, {
                question: "What did you have for lunch?",
                test_id: 2,
                correct: "food",
                false_question_one: "batteries",
                false_question_two: "a 1984 Volkswagon",
                recruiters_id: 1
            }, {
                question: "Do you enjoy tests?",
                test_id: 2,
                correct: "Love them!",
                false_question_one: "not really",
                false_question_two: "is this a test?",
                recruiters_id: 1
            }, {
                question: "How do you feel about unit tests?",
                test_id: 2,
                correct: "They are the best thing since sliced bread",
                false_question_one: "puke emoji",
                false_question_two: "I could go for a chai right now",
                recruiters_id: 1
            }, {
                question: "What is KNEX?",
                test_id: 2,
                correct: "a way of making SQL requests in JS",
                false_question_one: "A building toy from the early 90s",
                false_question_two: "How the kids say kleenex now",
                recruiters_id: 1
            }, {
                question: "What is SQL",
                test_id: 2,
                correct: "a system for querying databases",
                false_question_one: "the second movie in a series",
                false_question_two: "A nighttime decongestant",
                recruiters_id: 1
            }, {
                question: "What is Java?",
                test_id: 3,
                correct: "A programming language",
                false_question_one: "An island in Indonesia",
                false_question_two: "Coffee",
                recruiters_id: 1
            }, {
                question: "How do you like your Java?",
                test_id: 3,
                correct: "on my screen",
                false_question_one: "Black",
                false_question_two: "Two lumps",
                recruiters_id: 1
            }, {
                question: "Is Java the same as JavaScript",
                test_id: 3,
                correct: "uh... no",
                false_question_one: "duh",
                false_question_two: "I think so",
                recruiters_id: 1
            }, {
                question: "Isn't java a kind of alien from Star Wars?",
                test_id: 3,
                correct: "No, that was Jawa",
                false_question_one: "nerd",
                false_question_two: "Definitely",
                recruiters_id: 1
            }, {
                question: "How much Java is too much?",
                test_id: 3,
                correct: "You can never get too much",
                false_question_one: "More than 8 cups/day",
                false_question_two: "never using any other language ever",
                recruiters_id: 1
            }, {
                question: "Who invented Java?",
                test_id: 3,
                correct: "a computer programmer",
                false_question_one: "Arabic shepherds from the middle ages",
                false_question_two: "Bill Gates",
                recruiters_id: 1
            }, {
                question: "Who makes the best Java?",
                test_id: 3,
                correct: "Tim Hortons",
                false_question_one: "Dunkin Donuts",
                false_question_two: "Starbucks",
                recruiters_id: 1
            }, {
                question: "Galvanize Phoenix teaches Java",
                test_id: 3,
                correct: "They Do!  Ain't it great!",
                false_question_one: "They would never...",
                false_question_two: "Only if you know the secret handshake",
                recruiters_id: 1
            }, {
                question: "Java is for dogs?",
                test_id: 3,
                correct: "No, java is for computers and for humans",
                false_question_one: "Dogs love Java!",
                false_question_two: "Java is for EVERYONE!",
                recruiters_id: 1
            }, {
                question: "How much does Java cost?",
                test_id: 3,
                correct: "It's not for sale, it's something that you learn",
                false_question_one: "$5",
                false_question_two: "$7.8 Billion",
                recruiters_id: 1
            }]);
        });
};
