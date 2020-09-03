//controller.js
const db = require('../models/db.js');
const User = require('../models/UserModel.js');


const controller = {

    getFirstPage: function(req,res){
        res.render('login');
    },

    getHomePage: async function(req, res) {
        console.log("userID: " + req.session.userID);

        db.findOne(User, {_id: req.session.userID}, null, function(result) {
            //res.send(result);
            console.log("result: " + result)
            if(result) {
                console.log("checking if user exist");
                if (req.session.userID) {
                    result.userID = req.session.userID;
                    res.render('home', result);
                } else {
                    result.userID = null;
                    console.log("home error");
                    //res.render('error', result);
                }

            }
            else {
                console.log('There was an error: ');

            }
        });

    },

    getSettings: async function(req, res) {
        try{
        var userID = req.session.userID;
        var query = {
            _id: userID
        };

        if (userID) {
            db.findOne(User, query, null, function(result) {
                result.userID = userID;
                res.render("settings", result);
            });
        } else
            res.render("error", {
                details: "ERROR: Please Log In or Register an Account"
            })

        } catch (error) {
        console.log('There was an error: ', error);
        }
    },

    getInventory: function(req,res){
        res.render('inventory', {
            title:  'Stock Inventory',
        });
    },

    getOrders: function(req,res){
        res.render('orders', {
            title:  'Manage Orders',
        });
    },    

    getContacts: function(req,res){
        res.render('contacts', {
            title:  'Customer List',
        });
    },

}

module.exports = controller;