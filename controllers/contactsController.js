const db = require('../models/db.js');
const Contact = require('../models/ContactModel.js');

const contactsController = {
    getContacts: function(req,res){
        var query = {};
        var projection = {};

        db.findMany(Contact, query, projection, function(results) {
            console.log(results);
            res.render('contacts', {
                customers: results
            });
        });
    }
}

module.exports = contactsController;