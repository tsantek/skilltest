const knex = require("../db/knex.js");

module.exports = {
    // CHANGE ME TO AN ACTUAL FUNCTION
    index: (req, res) => {
        knex('doctors')
            .then((result) => {
                res.render("pages/index", { result });
            }).catch((err) => {
                console.log(err)
            });

    },
    book: (req, res) => {
        knex('doctors')
            .where('doc_id', req.params.id)
            .then((result) => {
                res.render("pages/book", { result });
            })

    },
    bookAppointment: (req, res) => {
        knex('patients')
            .insert({
                name: req.body.name,
                date: req.body.date,
                reason: req.body.reason,
                details: req.body.details,
                doctor_id: req.params.id,
                appointment_status: "unconfirmed"
            })
            .then(() => {
                res.redirect("/");
            })
    },
    loginPage: (req, res) => {
        res.render("pages/login");
    },
    register: (req, res) => {
        knex('doctors')
            .insert(req.body)
            .then(() => {
                res.redirect("/login");
            })
    },
    login: (req, res) => {
        knex('doctors')
            .where('email', req.body.email).then((results) => {
                let user = results[0];
                if (!user) {
                    res.redirect('/login');
                    return;
                }
                if (user.password === req.body.password) {
                    req.session.user_id = user.doc_id;
                    req.session.save(() => {
                        res.redirect(`/doc_dashboard/${user.doc_id}`);
                    })
                } else {
                    res.redirect("/login");
                }
            })
    },
    doc_dashboard: (req, res) => {
        knex('doctors')
            .where('doc_id', req.params.id)
            .then((doctor) => {
                knex('patients')
                    .where('doctor_id', req.params.id)
                    .then((patient) => {
                        let unconfirmed = [];
                        let confirmed = [];
                        let complited = [];
                        for (let i = 0; i < patient.length; i++) {
                            if (patient[i].appointment_status == 'unconfirmed') {
                                unconfirmed.push(patient[i]);
                            }
                            if (patient[i].appointment_status == 'confirmed') {
                                confirmed.push(patient[i]);
                            }
                            if (patient[i].appointment_status == 'complited') {
                                complited.push(patient[i]);
                            }
                        }
                        res.render("pages/doc_dashboard", { doctor, unconfirmed, confirmed, complited });
                    })

            })
    },
    patientConfirmed: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                knex('doctor_notes')
                    .where('pat_id', req.params.id)
                    .then((notes) => {
                        res.render("pages/patientConfirmed", { notes, patient });
                    })
            })
    },
    addNote: (req, res) => {
        knex('doctor_notes')
            .insert({
                pat_id: req.params.id,
                note: req.body.note
            })
            .then((notes) => {
                res.redirect(`../patientConfirmed/${req.params.id}`);
            })
    },
    complited: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .update({
                appointment_status: 'complited'
            })
            .then((result) => {
                res.redirect(`/doc_dashboard/${req.params.doc_id}`);
            })
    },
    patientUncomplited: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                knex('doctor_notes')
                    .where('pat_id', req.params.id)
                    .then((notes) => {
                        res.render('pages/patientUncomplited', { notes, patient })
                    })
            })
    },

    confirm: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .update({
                appointment_status: 'confirmed'
            })
            .then((result) => {
                res.redirect(`/doc_dashboard/${req.params.doc_id}`);
            })
    },
    addNote2: (req, res) => {
        knex('doctor_notes')
            .insert({
                pat_id: req.params.id,
                note: req.body.note
            })
            .then((notes) => {
                res.redirect(`../patientUncomplited/${req.params.id}`);
            })
    },
    patientComplited: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                knex('doctor_notes')
                    .where('pat_id', req.params.id)
                    .then((notes) => {
                        res.render('pages/patientComplited', { notes, patient })
                    })
            })
    },
    addNote3: (req, res) => {
        knex('doctor_notes')
            .insert({
                pat_id: req.params.id,
                note: req.body.note
            })
            .then((notes) => {
                res.redirect(`../patientComplited/${req.params.id}`);
            })
    },
    delete: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .del()
            .then((result) => {
                res.redirect(`/doc_dashboard/${req.params.doc_id}`);
            })
    },
    edit: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                res.render("pages/edit", { patient });
            })
    },
    edit1: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                res.render("pages/edit1", { patient });
            })
    },
    edit2: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .then((patient) => {
                res.render("pages/edit2", { patient });
            })
    },
    update: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .update({
                name: req.body.name,
                date: req.body.date,
                reason: req.body.reason,
                details: req.body.details,
            })
            .then((result) => {
                res.redirect(`/patientUncomplited/${req.params.id}`);
            })
    },
    update1: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .update({
                name: req.body.name,
                date: req.body.date,
                reason: req.body.reason,
                details: req.body.details,
            })
            .then((result) => {
                res.redirect(`/patientConfirmed/${req.params.id}`);
            })
    },
    update2: (req, res) => {
        knex('patients')
            .where('patient_id', req.params.id)
            .update({
                name: req.body.name,
                date: req.body.date,
                reason: req.body.reason,
                details: req.body.details,
            })
            .then((result) => {
                res.redirect(`/patientComplited/${req.params.id}`);
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