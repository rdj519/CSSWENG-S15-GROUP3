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

    }
}

module.exports = stockInventoryController;