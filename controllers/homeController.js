const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Product = require('../models/ItemModel.js');

const homeController = {
    getHomePage: async function(req, res) {
        console.log("userID: " + req.session.userID);

        db.findOne(User, {_id: req.session.userID}, null, function(result) {
            var query = {$expr:{$lte:["$quantity", "$lowStockQuantity"]}};
            var projection = {};
            db.findMany(Product, query, projection, function(products) {
                console.log(products);
                console.log("result: " + result)
                if(result) {
                    console.log("checking if user exist");
                    if (req.session.userID) {
                        result.userID = req.session.userID;
                        res.render('home', {user:result, products: products});
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
    }
}

module.exports = homeController;