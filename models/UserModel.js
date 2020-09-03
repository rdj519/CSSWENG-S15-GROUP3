//UserModel.js
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    pictures: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);