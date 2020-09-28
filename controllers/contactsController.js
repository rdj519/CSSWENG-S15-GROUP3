const db = require('../models/db.js');
const Contact = require('../models/ContactModel.js');

const contactsController = {
    getContacts: function(req,res){
        var query = {};
        var projection = {};

        db.findMany(Contact, query, projection, function(results) {
        
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

    updateContact: function(req, res) {
        var _id = req.query._id;
		var contactNumber = req.query.contactNumber;
		var homeAddress = req.query.homeAddress;
		var city = req.query.city;
        var remarks = req.query.remarks;

        var query = {_id:_id};
        var update = {contactNumber:contactNumber, homeAddress:homeAddress, city:city, remarks:remarks}
        db.updateOne(Contact, query, update, function(results) {

        });

    },

    getContact: function(req, res) {
        var _id = req.query._id;
        var query = {_id:_id};
        var projection = {};

        db.findOne(Contact, query, projection, function(result){
            res.send(result);
        });
    }
}

module.exports = contactsController;