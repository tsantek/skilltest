const knex = require("../db/knex.js");

module.exports = {

    // DASHBOARD GET USER
    userDashboard: (req, res) => {
        knex('users')
          .join('tests_complited', 'users.id', '=', 'tests_complited.user_id')
          .where('tests_complited.recruiters_id', req.params.rid)
          .where('users.id', req.params.uid)
          .then(test => {
            console.log('this is test', test)
            res.render("/pages/userPage")
          })
    },
}