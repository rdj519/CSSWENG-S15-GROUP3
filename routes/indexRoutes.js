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




module.exports = router;