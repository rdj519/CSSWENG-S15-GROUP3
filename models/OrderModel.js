var mongoose = require('mongoose');


var ItemSchema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lowStockQuantity: {
        type: Number,
        required: true
    }
});

// defines the schema for collection `orders`
var OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    contactNumber: {
        type: Number,
        minlength: 3,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    courier: {
        type: String,
        required: true
    },
    placedDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    customerOrder: {
        type: [ItemSchema],
        required: true
    }

});

// exports a mongoose.model object based on `OrderSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `orders` -> plural of the argument `Order`
module.exports = mongoose.model('Order', OrderSchema);