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
        var placedDate = req.body.placedDate;
    
        
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
            placedDate: placedDate
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
    }

}

module.exports = ordersController;