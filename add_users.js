//add_users.js
const db = require('./models/db.js');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

const collection = 'users';
const User = require('./models/UserModel.js');


var user = {
    email: "castilla@siopau.com",
    pw: "siopau123",
    name: "Castilla Frozen Foods Management System"
};

bcrypt.hash(user.pw, saltRounds, function(err, hash) {
    user.pw = hash
    db.insertOne(User, user, function(flag) {
        db.findOne(User, {
            email: user.email
        }, null, function(result) {
            console.log(result)
        })
    })
})
/*
*/