const knex = require("../db/knex.js");

module.exports = {
    addUser: (req, res) => {
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
                                        res.render("pages/dashboardAddUser", { user, test, result, recruiter });
                                    })
                            })
                    })
            })
    },

    createUser: (req, res) => {
        knex('users').insert({
            name: req.body.name,
            email: req.body.email,
            recruiters_id: req.params.id,
            notes: []
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

    addNote: (req, res) => {
        knex('users')
            .where('id', req.params.uid)
            .update({
                notes: knex.raw('array_append(notes, ?)', [req.body.note])
            }).then(() => {
                res.redirect(`/dashboard/${req.params.rid}/user/${req.params.uid}`)
            })
    }
}