const knex = require("../db/knex.js");

module.exports = {
  create: (req, res) => {
      knex('users')
          .where('recruiters_id', req.params.id)
          .then((user) => {
              knex('tests')
                  .where('recruiters_id', req.params.id)
                  .then((test) => {
                      res.render("pages/dashboardcreate", { user, test });
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
