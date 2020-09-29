const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Product = require('../models/ItemModel.js');
const Order = require('../models/OrderModel.js');

const homeController = {
    getHomePage: async function(req, res) {
        console.log("userID: " + req.session.userID);

        db.findOne(User, {_id: req.session.userID}, null, function(result) {
            var productquery = {$expr:{$lte:["$quantity", "$lowStockQuantity"]}};
            var productprojection = {};
            var today = new Date().toISOString();
            var orderquery = {"deliveryDate": { $gte: today }};
            var orderprojection = {};
            db.findMany(Product, productquery, productprojection, function(products) {
                db.findMany(Order, orderquery, orderprojection, function(orders) {
                    console.log("result: " + result)
                    if(result) {
                        console.log("checking if user exist");
                        if (req.session.userID) {
                            result.userID = req.session.userID;
                            res.render('home', {user:result, products: products, orders:orders});
                        } else {
                            result.userID = null;
                            console.log("home error");
                        }

                    }
                    else {
                        console.log('There was an error: ');

                    }
                });
            });
        });
    }
}

module.exports = homeController;