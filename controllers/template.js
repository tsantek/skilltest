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

    }
}