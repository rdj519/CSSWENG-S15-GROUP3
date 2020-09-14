const db = require('./models/db.js');

/* This is used to hash the password of the admin */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();


const Order = require('./models/OrderModel.js');



var order = {
    orderNumber: 1,
    customerName: "Rey Delima",
    contactNumber: 91234567891,
    homeAddress: "5th Wyoming St., Forbes Park",
    city: "Manila",
    productTotal: 4,
    paymentMethod: "gcash",
    courier: "castilla",
    deliveryFee: 500,
    placedDate: new Date(2020, 9, 13),
    deliveryDate: new Date(2020, 9, 20),
    status: "confirmed"

}
db.insertOne(Order, order, function(flag){});


