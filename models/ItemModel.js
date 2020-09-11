var mongoose = require('mongoose');


//defines the schema for collection 'items'
var ItemSchema = new mongoose.Schema({
    itemID: {
        type: Number,
        ref: 'User',
        required: true
    },
    // name of item
    name: {
        type: String,
        required: true
    },
    // amount per pack
    amountPerPack: {
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


module.exports = mongoose.model('Item', ItemSchema);