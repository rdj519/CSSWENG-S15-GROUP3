var mongoose = require('mongoose');

/* Item Schema */
const Item = require('./models/ItemModel.js');


/* defines the schema for collection `orders` */
var OrderSchema = new mongoose.Schema({
    // order number, identifier
    orderNumber: {
        type: Number,
        required: true

    },
    // name of customer
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    // contact number of customer
    contactNumber: {
        type: Number,
        minlength: 3,
        required: true
    },
    // home address of customer
    homeAddress: {
        type: String,
        required: true
    },
    // city of the address
    city: {
        type: String,
        required: true
    },
    // total amount to be paid by the customer
    totalAmount: {
        type: Number,
        required: true
    },
    // payment method 
    paymentMethod: {
        type: String,
        required: true
    },
    // courier for the delivery
    courier: {
        type: String,
        required: true
    },
    // date placed
    placedDate: {
        type: Date,
        required: true
    },
    // delivery date
    deliveryDate: {
        type: String,
        required: true
    },
    // customer order, list of items
    // to be changed, because the quantity of items also has to be considered
    customerOrder: {
        type: [Item],
        required: true
    },
    // order status
    status: {
        type: String,
        required: true
    }

});

// exports a mongoose.model object based on `OrderSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `orders` -> plural of the argument `Order`
module.exports = mongoose.model('Order', OrderSchema);