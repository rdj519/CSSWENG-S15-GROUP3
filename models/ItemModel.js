var mongoose = require('mongoose');


//defines the schema for collection 'items'
var ItemSchema = new mongoose.Schema({
    userID: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    // name of item
    name: {
        type: String,
        required: true
    },
    // amount per pack
    amount: {
        type: Number,
        required: true
    },
    // price per pack
    price: {
        type: Number,
        required: true
    },
    // quantity of packs
    quantity: {
        type: Number,
        required: true
    },
    // low stock quantity threshold (for notifications)
    lowStockQuantity: {
        type: Number,
        required: true
    }
});


// exports a mongoose.model object based on `ItemSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `item` -> plural of the argument `Item`
module.exports = mongoose.model('Item', ItemSchema);