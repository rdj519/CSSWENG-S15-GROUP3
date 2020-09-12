var mongoose = require('mongoose');

/* Item Schema */
//const Item = require('./ItemModel.js');

/* Local Item Schema */
var orderedItem = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    }
});

/* defines the schema for collection `orders` */
var OrderSchema = new mongoose.Schema({
    // name of customer
    customerName: {
        type: String,
        minlength: 0,
        required: true
    },
    // contact number of customer
    contactNumber: {
        type: Number,
        minlength: 0,
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
    // total amount of the products
    productTotal: {
        type: Number,
        required: true
    },

    // payment method 
    paymentMethod: {
        type: String,
        enum: ["cod", "gcash", "paymaya"],
        required: true
    },
    // courier for the delivery
    courier: {
        type: String,
        enum: ["castilla", "lalamove", "mrspeedy", "grabexpress"],
        required: true
    },
    //  delivery fee
    deliveryFee: {
        type: Number,
        required: false
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
    /*
    customerOrder: {
        type: [orderedItem],
        required: true
    }, */
    // order status
    status: {
        type: String,
        enum: ["confirmed", "paid", "delivering", "completed", "cancelled"], 
        required: true
    }

});


module.exports = mongoose.model('Order', OrderSchema);
