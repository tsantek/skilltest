//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
module.exports = function(app) {

    app.get('/', template.index);
    app.get('/login', template.loginPage);
    app.get('/register', template.registerPage);
    app.get('/logout', template.logout);


    app.post('/registerRecruiters', template.registerRecruiters);
    app.post('/loginRecruiters', template.loginRecruiters);

    app.use(authMiddleware);
    app.get('/dashboard/:id', template.dashboard);
    app.get('/dashboard/:id/user/:id', user.userDashboard);

    function authMiddleware(req, res, next) {
        if (!req.session.user_id) {
            res.redirect("/login");
        } else {
            next();
        }
    }
}