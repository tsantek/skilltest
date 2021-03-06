const knex = require("../db/knex.js");
const helpers = require('../public/js/helpers.js')
var questionIterator = 0;

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
          knex('tests').where('id', req.params.tid).then((result) => {
            var newTotal = (result[0].total + 1)
            knex('tests').where('id', req.params.tid).update({
              total: newTotal
            }).then(() => {
              res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
            })
          })
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
      knex('tests').where('id', req.params.tid).then((result) => {
        var newTotal = (result[0].total - 1)
        knex('tests').where('id', req.params.tid).update({
          total: newTotal
        }).then(() => {
          knex('questions').where('id', req.params.qid).del().then(() => {
              res.redirect(`/dashboard/${req.params.rid}/test/${req.params.tid}`)
          })
        })
      })
    },

    taketest: (req, res) => {
        knex('tests').where('code', req.params.id).then((result) => {
            res.render('pages/taketest', { result });
        })
    },

    start: (req,res) => {
      knex('users').where('email', req.body.email).then((user) => {
        if(user.length < 1) {
          var message = {content: 'We don\'t have this email address on file, please check with the recruiter who gave you this link'}
          res.render('pages/message', {message})
        } else {
          knex('tests').where('id', req.params.tid).then((tests) => {
            knex('questions').where('test_id', req.params.tid).then((result) => {
              knex('tests_completed').where('user_id', user[0].id)
              .where('test_id', req.params.tid).then((results) => {
                var attempt = 0
                var resultsIndex = 0
                for (var i = 0; i < results.length; i++) {
                  if (results[i].id > attempt) {
                    attempt = results[i].id
                    resultsIndex = i
                  }
                }
                if (results[resultsIndex].completed == false) {
                  var test = req.params.tid;
                  var question = result
                  var arr = [['correct', 'correct'], ['false_question_one', 'incorrect'], ['false_question_two', 'incorrect']]
                  var newArr = helpers.shuffle(arr);
                  res.render('pages/start', {question, test, user, tests, newArr});
                  console.log(test)
                  console.log(tests)
                } else {
                  var message = {content: 'You\'ve already submitted this test.  Contact your recruiter if you would like to take the test again'}
                  res.render('pages/message', {message})
                }
              })
            })
          })
        }
      })
    },

    next: (req,res) => {
      var user = [{id: req.params.uid}];
      questionIterator ++;
      knex('tests_completed').where('user_id', req.params.uid)
      .where('test_id', req.params.tid).then((results) => {
        var attempt = 0
        var resultsIndex = 0
        for (var i = 0; i < results.length; i++) {
          if (results[i].id > attempt) {
            attempt = results[i].id
            resultsIndex = i
          }
        }
        if (req.body.response == 'correct') {
          var newCorrect = (results[resultsIndex].correct + 1)
          knex('tests_completed').where('id', results[resultsIndex].id).update({
            correct: newCorrect
          }).then(() => {
            var totes = (results[resultsIndex].total - 1)
            if (questionIterator > totes) {
              questionIterator = 0
              knex('tests_completed').where('id', results[resultsIndex].id).update({
                completed: true
              }).then(() => {
                var message = {content: 'Test Completed!'}
                res.render('pages/message', {message})
              })
            } else {
              knex('questions').where('test_id', req.params.tid).then((result) => {
                var test = req.params.tid
                var question = [result[questionIterator]]
                var arr = [['correct', 'correct'], ['false_question_one', 'incorrect'], ['false_question_two', 'incorrect']]
                var newArr = helpers.shuffle(arr);
                res.render('pages/start', {question, test, user, newArr})
              })
            }
          })
        } else {
          var totes = (results[resultsIndex].total - 1)
          if (questionIterator > totes) {
            questionIterator = 0
            knex('tests_completed').where('id', results[resultsIndex].id).update({
              completed: true
            }).then(() => {
              var message = {content: 'Test Completed!'}
              res.render('pages/message', {message})
            })
          } else {
            knex('questions').where('test_id', req.params.tid).then((result) => {
              var test = req.params.tid
              var question = [result[questionIterator]]
              var arr = [['correct', 'correct'], ['false_question_one', 'incorrect'], ['false_question_two', 'incorrect']]
              var newArr = helpers.shuffle(arr);
              res.render('pages/start', {question, test, user, newArr})

            })
          }
        }
      })
    },

    landingcode: (req , res) => {
      var trimcode = req.body.testcode.trim();
      res.redirect(`/taketest/${trimcode}`)
    }
}
