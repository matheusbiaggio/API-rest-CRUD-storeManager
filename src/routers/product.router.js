const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.productsController.getAllProducts);

router.get('/:id', controllers.productsController.getProductById);

module.exports = router;