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
        res.render("pages/landing");
    },
    // registerRecruiters: (req, res) => {
    //     knex('recruiters')
    //         .insert(req.body)
    //         .then(() => {
    //             // MISSING REDIRECT ROUTE 
    //             res.redirect("/login");
    //         })
    // },
    // loginRecruiters: (req, res) => {
    //     knex('recruiters')
    //         .where('email', req.body.email).then((results) => {
    //             let user = results[0];
    //             if (!user) {
    //                 res.redirect('/login');
    //                 return;
    //             }
    //             if (user.password === req.body.password) {
    //                 req.session.user_id = user.doc_id;
    //                 req.session.save(() => {
    //                     // MISSING REDIRECT ROUTE 
    //                     res.redirect(`/`);
    //                 })
    //             } else {
    //                 // MISSING REDIRECT ROUTE 
    //                 res.redirect("/login");
    //             }
    //         })
    // },
}