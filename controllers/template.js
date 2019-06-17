const knex = require("../db/knex.js");

module.exports = {
    // CHANGE ME TO AN ACTUAL FUNCTION
    index: (req, res) => {
<<<<<<< HEAD
                res.render("pages/login");
    

    }
=======
        res.render("pages/landing");
    },
    // loginPage: (req, res) => {
    //     // MISSING REDIRECT ROUTE 
    //     res.render("pages/login");
    // },
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
>>>>>>> 23afec6cf7f25dd6f220b5349396acc90f919e58
}