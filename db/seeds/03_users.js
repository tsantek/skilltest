exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { name: "User Jess", email: 'user@user.com', notes: [{date: "5/21/2019", note: "Waiting to here back"},{date: "6/1/2019", note: "Took first test and scored average to other candidates interested in Software Engineering Developer position at Google"},{date: "6/15/2019", note: "Retook JavaScript test and scored 100%. Top candidate for Software Engineering Developer position at Google"}], recruiters_id: 1 },
                { name: " User John ", email: 'Jess@jones.com', notes: [{date: "5/21/2019", note: "Waiting to here back"},{date: "6/1/2019", note: "Took first test and scored average to other candidates interested in Software Engineering Developer position at Google"},{date: "6/15/2019", note: "Retook JavaScript test and scored 100%. Top candidate for Software Engineering Developer position at Google"}], recruiters_id: 1 },
                { name: "User Smith", email: 'meryl@smith.com', notes: [{date: "5/21/2019", note: "Waiting to here back"},{date: "6/1/2019", note: "Took first test and scored average to other candidates interested in Software Engineering Developer position at Google"},{date: "6/15/2019", note: "Retook JavaScript test and scored 100%. Top candidate for Software Engineering Developer position at Google"}], recruiters_id: 1 }
            ]);
        });
};