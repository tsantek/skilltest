//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
module.exports = function(app) {

    app.get('/', template.index);
    app.get('/book/:id', template.book);
    app.get('/login', template.loginPage);
    app.post('/bookAppointment/:id', template.bookAppointment);
    app.post('/register', template.register);
    app.post('/login', template.login);
    app.get('/logout', template.logout);


    app.use(authMiddleware);
    app.get('/doc_dashboard/:id', template.doc_dashboard);

    app.get('/patientConfirmed/:id', template.patientConfirmed);
    app.post('/complited/:id/:doc_id', template.complited);

    app.get('/patientUncomplited/:id', template.patientUncomplited);
    app.post('/confirm/:id/:doc_id', template.confirm);

    app.get('/patientComplited/:id', template.patientComplited);
    app.post('/delete/:id/:doc_id', template.delete);

    app.get('/edit/:id/:doc_id', template.edit);
    app.get('/edit1/:id/:doc_id', template.edit1);
    app.get('/edit2/:id/:doc_id', template.edit2);



    app.post('/update/:id/:doc_id', template.update);
    app.post('/update1/:id/:doc_id', template.update1);
    app.post('/update2/:id/:doc_id', template.update2);

    app.post('/addnote/:id', template.addNote);
    app.post('/addnote2/:id', template.addNote2);
    app.post('/addnote3/:id', template.addNote3);





    function authMiddleware(req, res, next) {
        if (!req.session.user_id) {
            res.redirect("/login");
        } else {
            next();
        }
    }
}