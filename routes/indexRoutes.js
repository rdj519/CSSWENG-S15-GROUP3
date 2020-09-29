//routes.js
const router = require('express').Router();
// const controller = require('../controllers/controller.js');
// const inventoryController = require('../controllers/InventoryController.js');
const express = require('express');
const { isPrivate, isPublic } = require('../middlewares/checkAuth');
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
router.get('/inventory', isPrivate, stockInventoryController.getProducts);
router.post('/addProduct', isPrivate, stockInventoryController.addProduct);
router.post('/delProduct', isPrivate, stockInventoryController.delProduct);
router.get('/findProduct', isPrivate, stockInventoryController.findProduct);
router.get('/getProductsSold', isPrivate, stockInventoryController.getProductsSold);
router.post('/updateProd', isPrivate, stockInventoryController.updateProduct);
router.get('/getPlaceStockOrder', isPrivate, stockInventoryController.getPlaceStockOrder);

// Orders
router.get('/orders', isPrivate, ordersController.getOrders);
router.post('/addOrder', isPrivate, ordersController.addOrder);
router.post('/postDelete', isPrivate, ordersController.postDelete);
router.post('/updateOrder', isPrivate, ordersController.updateOrder);
router.get('/getUpdateProductsSold', isPrivate, stockInventoryController.getProductsSold);

/*
router.get('/orders/status:status', isPrivate, ordersController.getOrdersByStatus); */


// Customer Contact List
router.get('/contacts', isPrivate, contactsController.getContacts);
router.get('/updateContact', isPrivate, contactsController.updateContact);
router.get('/getContact', isPrivate, contactsController.getContact);
router.get('/getDuplicate', isPrivate, contactsController.getDuplicate);
router.post('/addContact', isPrivate, contactsController.addContact);
router.post('/deleteContact', isPrivate, contactsController.deleteContact);

// Account Settings
router.get('/settings', isPrivate, accountController.getSettings);


router.get('/', isPublic, controller.getFirstPage);
router.get('/home', isPrivate,  controller.getHomePage);
router.get('/settings', isPrivate, controller.getSettings);
router.get('/inventory', isPrivate, controller.getInventory);
router.get('/orders', isPrivate, controller.getOrders);
router.get('/contacts', isPrivate, controller.getContacts);


module.exports = router;