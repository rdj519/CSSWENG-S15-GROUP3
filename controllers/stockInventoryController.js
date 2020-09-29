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
        db.deleteOne(Product, {name: req.body.name}, function(flag) {
            res.send("success");
        });
    },

    updateProduct: function(req, res) {
        console.log("updateProduct");
        console.log("req.body.quantity " + req.body.quantity);
        console.log("req.body.name " + req.body.name);

        var name = req.body.name;
      
        var updates = {
            quantity: req.body.quantity,
            price: req.body.price,
            lowStockQuantity: req.body.lowstockQuantity
        }

        db.findOne(Product, {name:name}, null, function(result) {
            db.updateOne(Product, {name:name}, updates, function(result1) {
                console.log(result1);
                res.send("success");

            });
        });
    }
}

module.exports = stockInventoryController;