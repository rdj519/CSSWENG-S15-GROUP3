const stockInventoryController = require("./stockInventoryController")

const db = require('../models/db.js');
const Order = require('../models/OrderModel.js');

const ordersController = {
    getOrders: function(req,res){
        res.render('orders', {
            title:  'Manage Orders',
        });
    },

    getOrders: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('orders', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    getOrdersByStatus: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {status: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    }
}

module.exports = ordersController;