//routes.js
const router = require('express').Router();
const controller = require('../controllers/controller.js');
const inventoryController = require('../controllers/InventoryController.js');
const express = require('express');
const { isPrivate, isPublic } = require('../middlewares/checkAuth');
const router = require('express').Router();
const app = express();

// Controllers
const controller = require('../controllers/controller.js');
const homeController = require('../controllers/homeController.js');
const stockInventoryController = require('../controllers/stockInventoryController.js');
const ordersController = require('../controllers/ordersController.js');
const contactsController = require('../controllers/contactsController.js');
const accountController = require('../controllers/accountController.js');


// Routes
// Homepage
router.get('/home', isPrivate, homeController.getHomePage);

// Stock Inventory
router.get('/inventory', isPrivate, stockInventoryController.getInventory);

// Orders
router.get('/orders', isPrivate, ordersController.getOrders);

// Customer Contact List
router.get('/contacts', isPrivate, contactsController.getContacts);

// Account Settings
router.get('/settings', isPrivate, accountController.getSettings);


router.get('/', isPublic, controller.getFirstPage);
router.get('/home', isPrivate,  controller.getHomePage);
router.get('/settings', isPrivate, controller.getSettings);
router.get('/inventory', isPrivate, controller.getInventory);
router.get('/orders', isPrivate, controller.getOrders);
router.get('/contacts', isPrivate, controller.getContacts);


/*
router.post('/editChili', isPrivate, inventoryController.updateProduct);
router.post('/addProd', isPrivate, inventoryController.addProduct);
*/
/*
router.get("*", function(req, res) {
    res.render("error")
})
*/

module.exports = router;