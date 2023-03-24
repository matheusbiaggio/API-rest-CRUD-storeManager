const express = require('express');
const controllers = require('../controllers');
const validadeNameField = require('../middlewares/validadeNameField');

const router = express.Router();

router.get('/', controllers.productsController.getAll);

router.get('/:id', controllers.productsController.getById);

router.post('/', validadeNameField, controllers.productsController.addProduct);

router.put('/:id', validadeNameField, controllers.productsController.updateProduct);

router.delete('/:id', controllers.productsController.deleteProduct);

module.exports = router;