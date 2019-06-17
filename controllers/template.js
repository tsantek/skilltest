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
    //  SIGNUP 
    registerPage: (req, res) => {
        res.render("pages/register");
    },
    dashboard: (req, res) => {
        // MISSING REDIRECT ROUTE 
        res.send("HELLO");
    },
    registerRecruiters: (req, res) => {
        knex('recruiters')
            .insert(req.body)
            .returning('*')
            .then((user) => {
                req.session.user_id = user[0].id;
                req.session.save(() => {
                    res.redirect(`/dashboard`);
                })
            })
    },
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
                        res.redirect(`/dashboard`);
                    })
                } else {
                    res.redirect("/login");
                }
            })
    },
}