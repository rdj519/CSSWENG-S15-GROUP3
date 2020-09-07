//controller.js
const db = require('../models/db.js');
const User = require('../models/UserModel.js');


const controller = {

    getFirstPage: function(req,res){
        res.render('login');
    }
}

module.exports = controller;