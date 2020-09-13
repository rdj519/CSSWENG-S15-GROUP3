const stockInventoryController = require("./stockInventoryController")

const db = require('../models/db.js');
const Order = require('../models/OrderModel.js');

const { validationResult } = require('express-validator');

const ordersController = {

    getOrders: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {};


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('orders', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    addOrder: function(req, res) {
        var customerName = req.body.customerName;
        var contactNumber= req.body.contactNumber;
        var homeAddress = req.body.homeAddress;
        var city = req.body.city;
        var productTotal = req.body.productTotal;
        var paymentMethod = req.body.paymentMethod;
        var courier = req.body.courier;
        var status = req.body.status;
        var deliveryDate = req.body.deliveryDate;
        var deliveryFee = req.body.deliveryFee;
        var placedDate = req.body.placedDate;
        var customerOder = req.body.customerOrder;
    
        
        var order = {
            customerName: customerName,
            contactNumber: contactNumber,
            homeAddress: homeAddress,
            city: city,
            productTotal: productTotal,
            paymentMethod: paymentMethod,
            courier: courier,
            status: status,
            deliveryDate: deliveryDate,
            deliveryFee: deliveryFee,
            placedDate: placedDate,
            customerOrder: customerOder
        };

        console.log(order);
        
        db.insertOne(Order, order, function(flag){
            
            res.send("success");
        });
        
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
    },

    getOrdersByCustomerName: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {customerName: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },
    
    getOrdersByPaymentMethod: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {paymentMethod: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    getOrdersByCourier: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {courier: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },
    getOrdersByCity: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {city: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    getOrdersByPlacedDate: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {placedDate: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    getOrdersByDeliveryDate: function (req, res) {

        var query = {};
        var projection = {};
        var mySort = {deliveryDate: 1}


        db.findMany(Order, query, projection, function(result) {

            if(result != null) {

                res.render('search', {contents: result});
            }

            else {

                res.render('error');
            }
        }, mySort);
    },

    updateOrder: function(req, res) {

        console.log("update Order\n");
        console.log("req.body.placedDate " + req.body.placedDate);
        //console.log("req.body._id " + req.body._id);
        console.log("req.body.courier " + req.body.courier);

        var name = req.body.name;
        var _id = req.body._id;

        var updates = {
            _id: req.body._id,
            contactNumber: req.body.contactNumber,
            homeAddress: req.body.homeAddress,
            city: req.body.city,
            placedDate: req.body.placedDate,
            deliveryDate: req.body.deliveryDate,
            courier: req.body.courier,
            paymentMethod: req.body.paymentMethod,
            status: req.body.status
        }

        db.findOne(Order, {name:name, _id:_id}, null, function(result) {
            db.updateOne(Order, {name:name, _id:_id}, updates, function(result1) {
                console.log(result1);
                res.send("success");

            });
        });
    }

}

module.exports = ordersController;