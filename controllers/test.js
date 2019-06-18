const knex = require("../db/knex.js");
var q = {
  i: 1
};

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
                                          console.log(recruiter)
                                          res.render("pages/dashboardcreate", { user, test, result, recruiter});
                                      })
                              })
                      })
              })
      },

  question: (req, res) => {
      knex('tests').insert({
        name: req.body.testName,
        // prompt: req.body.Prompt,
        total: req.body.questions,
        recruiters_id: req.params.id,
        code: req.body.code
      }).then(() =>
      knex('tests').where('name', req.body.testName).then((result) => {
        q.id = result.id;
      }).then(() => {
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
                                      q.code = req.body.code
                                      q.total = req.body.questions
                                      console.log(q.id)
                                      console.log(recruiter)
                                      console.log(q)
                                      res.render("pages/dashboardcreatequestion", { user, test, result, recruiter, q});
                                  })
                          })
                  })
          })
      }))
  },

  questionnext: (req, res) => {
    knex('questions').insert({
      question: req.body.question,
      correct: req.body.correct,
      false_question_one: req.body.icone,
      false_question_two: req.body.ictwo,
      recruiters_id: req.params.id,
      test_id: 1
    }).then(() => {
      q.i ++
      if (q.total == 10) {
      if (q.i >= 11) {
        q.i = 1;
        res.redirect(`/dashboard/${req.params.id}`)
      } else {
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
                                        console.log(recruiter)
                                        console.log(q)
                                        res.render("pages/dashboardcreatequestion", { user, test, result, recruiter, q});
                                    })
                            })
                    })
            })
        }
  } else {
    if (q.i >= 6) {
      q.i = 1;
      res.redirect(`/dashboard/${req.params.id}`)
    } else {
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
                                      console.log(recruiter)
                                      console.log(q)
                                      res.render("pages/dashboardcreatequestion", { user, test, result, recruiter, q});
                                  })
                          })
                  })
          })
      }

  }
  })
}
}
