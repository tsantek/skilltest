const knex = require("../db/knex.js");

module.exports = {
    // HOME PAGE
    index: (req, res) => {
        res.render("pages/landing");
    },
    // LOGIN PAGE 
    loginPage: (req, res) => {
        res.render("pages/login");
    },
    //  SIGNUP  GET
    registerPage: (req, res) => {
        res.render("pages/register");
    },
    // DASHBOARD GET
    dashboard: (req, res) => {
        knex('users')
            .where('recruiters_id', req.params.id)
            .then((user) => {
                knex('tests')
                    .where('recruiters_id', req.params.id)
                    .then((test) => {
                        knex(`tests_complited`)
                            .join('users', 'tests_complited.test_id', 'users.id')
                            .join('tests', 'tests_complited.test_id', 'tests.id')
                            .select('tests.name', 'tests_complited.total', 'tests_complited.correct', 'users.name AS user_Name', 'users.email')
                            .where('tests_complited.recruiters_id', req.params.id)
                            .then((result) => {
                                res.render("pages/dashboard", { user, test, result });
                            })
                    })
            })
    },
    // REGISTER POST
    registerRecruiters: (req, res) => {
        knex('recruiters')
            .insert(req.body)
            .returning('*')
            .then((user) => {
                req.session.user_id = user[0].id;
                req.session.save(() => {
                    res.redirect(`/dashboard/${user[0].id}`);
                })
            })
    },
    // LOGIN POST 
    loginRecruiters: (req, res) => {
        knex('recruiters')
            .where('email', req.body.email).then((results) => {
                let user = results[0];
                if (!user) {
                    res.redirect('/login');
                    return;
                }
                if (user.password === req.body.password) {
                    req.session.user_id = user.id;
                    req.session.save(() => {
                        res.redirect(`/dashboard/${user.id}`);
                    })
                } else {
                    res.redirect("/login");
                }
            })
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    },
}