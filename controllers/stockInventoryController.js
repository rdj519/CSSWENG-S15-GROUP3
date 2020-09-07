const db = require('../models/db.js');

const stockInventoryController = {
    getInventory: function(req,res){
        res.render('inventory', {
            title:  'Stock Inventory',
        });
    }
}

module.exports = stockInventoryController;