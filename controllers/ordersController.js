const stockInventoryController = require("./stockInventoryController")

const db = require('../models/db.js');

const ordersController = {
    getOrders: function(req,res){
        res.render('orders', {
            title:  'Manage Orders',
        });
    }
}

module.exports = ordersController;