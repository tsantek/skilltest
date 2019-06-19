//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
const test = require("../controllers/test.js")
module.exports = function(app) {

    app.get('/', template.index);
    app.get('/login', template.loginPage);
    app.get('/register', template.registerPage);
    app.get('/logout', template.logout);


    app.post('/registerRecruiters', template.registerRecruiters);
    app.post('/loginRecruiters', template.loginRecruiters);


    app.use(authMiddleware);
    app.get('/dashboard/:id', template.dashboard);
    app.get('/dashboard/create/:id', test.create);
    app.post('/dashboard/create/:id', test.make);
    app.get('/dashboard/delete/:rid/:tid', test.delete);
    app.post('/dashboard/:rid/delete/:tid/:qid', test.editQ)
    app.get('/dashboard/:rid/delete/:tid/:qid', test.deleteQ)
    app.post('/:rid/add/:tid', test.question);
    app.get('/dashboard/:rid/user/:uid', template.userDashboard);

    app.get('/dashboard/:rid/test/:tid', template.testInfo);

    function authMiddleware(req, res, next) {
        if (!req.session.user_id) {
            res.redirect("/login");
        } else {
            next();
        }
    }
}
