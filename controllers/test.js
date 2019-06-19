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
                                      console.log({ user, test, result, recruiter })
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
                                        console.log({ user, test, result, recruiter })
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
        console.log(req.params)
          res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
      })
    },

    delete: (req,res) => {
      knex('tests').where('id', req.params.tid).del().then(() => {
        res.redirect(`/dashboard/${req.params.rid}`);
      })
    },

    editQ: (req,res) => {
      knex('questions').where('id', req.params.qid).update({
        question: req.body.question,
        correct: req.body.correct,
        false_question_one: req.body.false_question_one,
        false_question_two: req.body.false_question_two
      }).then(() => {
        res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
      })
    },

    deleteQ: (req,res) => {
      knex('questions').where('id', req.params.qid).del().then(() => {
        res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
      })
    },

    taketest: (req,res) => {
      knex('tests').where('code', req.params.id).then((result) => {
        console.log(result);
        res.render('pages/taketest', { result });
      })
    },

    start: (req,res) => {
      knex('users').where('email', req.body.email).then((user) => {
        if(user.length < 1) {
          res.send('We don\'t have this email address on file, please check with the recruiter who gave you this link')
        } else {
          console.log(user);
        knex('tests_completed').insert({
          test_id: req.params.tid,
          user_id: user[0].id,
          total: 0,
          correct: 0,
          recruiters_id: user[0].recruiters_id
        }).then(() => {
          knex('questions').where('test_id', req.params.tid).then((result) => {
            var test = req.params.tid;
            var question = result;
            res.render('pages/start', {question, test, user});
        })
      })
    }
  })
},

    next: (req,res) => {
      knex('tests_completed').where
      res.send(`${req.body.response}, ${req.params.tid}, ${req.params.qid}`);
    }
  }
