var mongoose = require('mongoose');


/* defines the schema for collection 'contacts' */
var ContactSchema = new mongoose.schema({
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
        type: String
        required: false
    }
});


// exports a mongoose.model object based on `ContactSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `contacts` -> plural of the argument `Contact`
module.exports = mongoose.model('Contact', ContactSchema);