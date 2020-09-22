var mongoose = require('mongoose');


/* defines the schema for collection 'contacts' */
var ContactSchema = new mongoose.Schema({
    // name of customer
    name: {
        type: String,
        required: true
    },
    // contact number of customer
    contactNumber: {
        type: Number,
        required: true
    },
    // home address of customer
    homeAddress: {
        type: String,
        required: true
    },
    // city home address
    city: {
        type: String,
        required: true
    },
    // remarks
    remarks: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('Contact', ContactSchema);