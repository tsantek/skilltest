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
                                  knex(`tests_complited`)
                                      .join('users', 'tests_complited.test_id', 'users.id')
                                      .join('tests', 'tests_complited.test_id', 'tests.id')
                                      .select('tests.name', 'tests_complited.total', 'tests_complited.correct', 'users.name AS user_Name', 'users.email')
                                      .where('tests_complited.recruiters_id', req.params.id)
                                      .then((result) => {
                                          console.log(recruiter)
                                          res.render("pages/dashboardcreate", { user, test, result, recruiter });
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
          knex('users')
              .where('recruiters_id', req.params.rid)
              .then((user) => {
                  knex('tests')
                      .where('recruiters_id', req.params.rid)
                      .then((test) => {
                          knex('recruiters')
                              .where('id', req.params.rid)
                              .then((recruiter) => {
                                  knex('tests')
                                      .where('recruiters_id', req.params.rid)
                                      .where('id', req.params.tid)
                                      .then(testItem => {
                                          knex('questions')
                                              .where('test_id', req.params.tid)
                                              .then(questions => {
                                                  res.render("pages/testPage", { user, test, recruiter, testItem, questions });
                                              })
                                      })
                              })
                      })
              })
      })
    }
  }
