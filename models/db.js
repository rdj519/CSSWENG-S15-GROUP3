//db.js
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/sample';
const User = require('./UserModel.js');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function() {
        mongoose.connect(url, options, function(error) {
            if (error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if (error) return callback(error);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if (error) return callback(error);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    find: function(model, sort = null, projection = null, callback) {
        model.find(projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if (error) return callback(error);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function(error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function(error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    sum: function(items, prop) {
        return items.reduce(function(a, b) {
            return (parseFloat(a) + parseFloat(b[prop])).toFixed(2);
        }, 0);
    },

    formatHistory: function(array) {
        const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];

        array = array.sort((a, b) => b["orderDate"] - a["orderDate"])
        for (i = 0; i < array.length; i++) {
            array[i].date = months[array[i]["orderDate"].getMonth()] + " " + array[i]["orderDate"].getDate() + ", " + array[i]["orderDate"].getFullYear()
            array[i].price = array[i].totalPrice.toFixed(2)
        }

        return array
    },

    formatPrice: function(array, prop) {
        for (i = 0; i < array.length; i++) {
            array[i].menuPriceF = parseFloat(array[i][prop]).toFixed(2)
        }

        return array
    }
}

module.exports = database;