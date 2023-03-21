const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.productsController.getAll);

router.get('/:id', controllers.productsController.getById);

module.exports = router;