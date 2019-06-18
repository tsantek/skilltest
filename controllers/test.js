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
      var q = {
        i: 1
      }
      knex('users')
          .where('recruiters_id', req.params.id)
          .then((user) => {
              knex('tests')
                  .where('recruiters_id', req.params.id)
                  .then((test) => {
                      res.render("pages/dashboardcreatequestion", { user, test, q });
                  })
          })
  },

  questionnext: (req, res) => {
      q++
      if (q <= 11) {
        res.redirect('pages/dashboard')
      } else {
      knex('users')
          .where('recruiters_id', req.params.id)
          .then((user) => {
              knex('tests')
                  .where('recruiters_id', req.params.id)
                  .then((test) => {
                      res.render("pages/dashboardcreatequestion", { user, test, q });
                  })
          })
  }
},
}
