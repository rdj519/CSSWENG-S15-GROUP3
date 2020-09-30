const db = require('../models/db.js');
const Product = require('../models/ItemModel.js');

const stockInventoryController = {
    getProducts: function(req, res) {
        var query = {};
        var projection = {};

        db.findMany(Product, query, projection, function(results) {
            res.render('inventory', {
                products: results
            });
        });
    },

    getProductQuantity: function(req, res){
        var query = {name: req.query.name};
        var projection = {};

        db.findOne(Product, query, projection, function(result){
            res.send(result.quantity);
        });
    },

    getProductByID: function(req, res) {
        var query = {_id: req.query._id};
        var projection = {};

        db.findOne(Product, query, projection, function(result){
            res.send(result);
        });
    },

    getProductsSold: function(req, res) {
        var query = {};
        var projection = {};

        db.findMany(Product, query, projection, function(results) {

            res.send(results);
        });
    },
    getPlaceStockOrder: function(req, res) {
       var query = {_id: req.query.productID}
       var decrement = req.query.quantity
    
       db.findOne(Product, query, null, function(result) {
     
            db.updateOne(Product,query, {$inc:{quantity:-decrement}}, function(results) {
             console.log("results: " + results);
            });
       });

    },

    addProduct: function(req, res) {
        var name = req.body.name;
        var amountPerPack = req.body.amountPerPack;
        var price = req.body.price;
        var quantity = req.body.quantity;
        var lowStockQuantity = req.body.lowStockQuantity;

        var product = {
            name: name,
            amountPerPack: amountPerPack,
            price: price,
            quantity: quantity,
            lowStockQuantity: lowStockQuantity
        };

        db.insertOne(Product, product, function(flag){
            res.send("success");
        });
    },

    findProduct: function(req, res) {
        var query = {name: req.query.name, amountPerPack: req.query.amountPerPack};
        var projection = {};

        db.findOne(Product, query, projection, function(result) {
            res.send(result);
        });
    },

    delProduct: function(req, res) {
        db.deleteOne(Product, {_id: req.body._id}, function(flag) {
            res.send("success");
        });
    },

    updateProduct: function(req, res) {
        console.log("updateProduct");
        console.log("req.body.quantity " + req.body.quantity);
        console.log("req.body.name " + req.body.name);

        var _id = req.body._id;
      
        var updates = {
            quantity: req.body.quantity,
            price: req.body.price,
            lowStockQuantity: req.body.lowstockQuantity
        }

        db.findOne(Product, {_id:_id}, null, function(result) {
            db.updateOne(Product, {_id:_id}, updates, function(result1) {
                console.log(result1);
                res.send("success");

            });
        });
    },
    getReturnProduct: function(req, res) {
        var query = {_id: req.query._id};
        var increment = req.query.quantity;

        db.updateOne(Product,query, {$inc:{quantity:increment}}, function(results) {
            res.send(results);
        });

        
    }
}

module.exports = stockInventoryController;


