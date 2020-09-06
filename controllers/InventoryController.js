//inventory controller

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const inventoryController = {
/*
    addProduct: async function(req,res) {

    }
*/
    updateProduct: async function(req, res) {
        try{
        console.log("update product");
        console.log(req.body);

        var pname = req.body.productName;
        var amt = req.body.amountPerPack;
        var quantity = req.body.stockQuantity;
        var price = req.body.pricePerPack;
        var low = req.body.lowStack;

        var _id = req.session.userID;

        var item = {
            name: pname,
            amount: amt,
            quantity: quantity,
            price: price,
            lowStockQuantity: low
        }

        db.findOne(Item, item, null, function(result) {
            db.updateOne(User, {_id: _id}, user, function(result1) {
                res.send(result1);
            });
        });

        } catch (error) {
        console.log('There was an error: ', error);
        }
    }

}

module.exports = inventoryController;