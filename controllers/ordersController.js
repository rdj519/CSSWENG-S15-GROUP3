const stockInventoryController = require("./stockInventoryController")

const db = require('../models/db.js');
const Order = require('../models/OrderModel.js');

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