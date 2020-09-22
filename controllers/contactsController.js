const db = require('../models/db.js');

const contactsController = {
    getContacts: function(req,res){
        res.render('contacts', {
            title:  'Customer List',
        });
    }
}

module.exports = contactsController;