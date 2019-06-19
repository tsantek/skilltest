const knex = require("../db/knex.js");

module.exports = {
    create: (req, res) => {
        knex('users')
            .where('recruiters_id', req.params.id)
            .then((user) => {
                knex('tests')
                    .where('recruiters_id', req.params.id)
                    .then((test) => {
                        knex('recruiters')
                            .where('id', req.params.id)
                            .then((recruiter) => {
                                knex(`tests_completed`)
                                    .join('users', 'tests_completed.test_id', 'users.id')
                                    .join('tests', 'tests_completed.test_id', 'tests.id')
                                    .select('tests.name', 'tests_completed.total', 'tests_completed.correct', 'users.name AS user_Name', 'users.email')
                                    .where('tests_completed.recruiters_id', req.params.id)
                                    .then((result) => {
                                        res.render("pages/dashboardcreate", { user, test, result, recruiter });
                                    })
                            })
                    })
            })
    },

    make: (req, res) => {
        knex('tests').insert({
            name: req.body.name,
            recruiters_id: req.params.id,
            total: 0,
            code: new Date()
        }).returning('*').then((result) => {
            var tid = parseInt(result[0].id);
            knex('users')
                .where('recruiters_id', req.params.id)
                .then((user) => {
                    knex('tests')
                        .where('recruiters_id', req.params.id)
                        .then((test) => {
                            knex('recruiters')
                                .where('id', req.params.id)
                                .then((recruiter) => {
                                    knex(`tests_completed`)
                                        .join('users', 'tests_completed.test_id', 'users.id')
                                        .join('tests', 'tests_completed.test_id', 'tests.id')
                                        .select('tests.name', 'tests_completed.total', 'tests_completed.correct', 'users.name AS user_Name', 'users.email')
                                        .where('tests_completed.recruiters_id', req.params.id)
                                        .then((result) => {
                                            res.render("pages/dashboard", { user, test, result, recruiter });
                                        })
                                })
                        })
                })
        })
    },

    question: (req, res) => {
        knex('questions').insert({
            question: req.body.question,
            correct: req.body.correct,
            false_question_one: req.body.false_question_one,
            false_question_two: req.body.false_question_two,
            recruiters_id: req.params.rid,
            test_id: req.params.tid
        }).then(() => {
            res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
        })
    },

    delete: (req, res) => {
        knex('tests').where('id', req.params.tid).del().then(() => {
            res.redirect(`/dashboard/${req.params.rid}`);
        })
    },

    editQ: (req, res) => {
        knex('questions').where('id', req.params.qid).update({
            question: req.body.question,
            correct: req.body.correct,
            false_question_one: req.body.false_question_one,
            false_question_two: req.body.false_question_two
        }).then(() => {
            res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
        })
    },

    deleteQ: (req, res) => {
        knex('questions').where('id', req.params.qid).del().then(() => {
            res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
        })
    }
}