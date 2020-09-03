//routes.js
const express = require('express');

const controller = require('../controllers/controller.js')
const loginController = require('../controllers/LogInController.js');
const logoutController = require('../controllers/LogOutController.js');

const db = require('../models/db.js');

const app = express();

app.get('/', controller.getFirstPage);
app.get('/home', controller.getHomePage);
app.get('/settings', controller.getSettings);
app.get('/inventory', controller.getInventory);
app.get('/orders', controller.getOrders);
app.get('/contacts', controller.getContacts);

app.post('/login', loginController.postLogIn);
//app.get('/checkLogIn', loginController.getLogIn);


app.get('/logout', logoutController.getLogOut);
//app.get('/edit', )

app.get("*", function(req, res) {
    res.render("error")
})

module.exports = app;