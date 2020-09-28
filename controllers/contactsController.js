const db = require('../models/db.js');

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
    },
    addContact: function(req, res) {
        var name = req.body.name;
        var contactNumber= req.body.contactNumber;
        var homeAddress = req.body.homeAddress;
        var city = req.body.city;
        var remarks = req.body.remarks;
        
        var contact = {
            name: name,
            contactNumber: contactNumber,
            homeAddress: homeAddress,
            city: city,
           	remarks: remarks,
        };

        console.log(contact);
        
        db.insertOne(Contacts, contact, function(flag){
            console.log("added");
            res.send("success");
        });
        
    },
}

module.exports = contactsController;