const express = require('express');
const controllers = require('../controllers');
const validadeNameField = require('../middlewares/validadeNameField');

const router = express.Router();

router.get('/', controllers.productsController.getAll);

router.get('/:id', controllers.productsController.getById);

router.post('/', validadeNameField, controllers.productsController.addProduct);

module.exports = router;