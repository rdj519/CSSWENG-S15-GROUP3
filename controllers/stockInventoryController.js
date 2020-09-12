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
        var price = req.body.amountPerPack;
        var quantity = req.body.amountPerPack;
        var lowStockQuantity = req.body.amountPerPack;
    

        db.findMany(Product, null, null, function(result) {
            var newSum = result.length + 1;

            var product = {
                itemID: "p-" + (result.length + 1),
                name: name,
                amountPerPack: amountPerPack,
                price: price,
                quantity: quantity,
                lowStockQuantity: lowStockQuantity
            };
            db.insertOne(Product, product, function(flag){
                res.send(newSum);
            });
        })
        
    }
}

module.exports = stockInventoryController;