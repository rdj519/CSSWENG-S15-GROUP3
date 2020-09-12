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
            // console.log(result);
            res.send(result);
        });
    }
}

module.exports = stockInventoryController;