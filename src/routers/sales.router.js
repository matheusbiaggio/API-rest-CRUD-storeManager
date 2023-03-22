const express = require('express');
const controllers = require('../controllers');
const validateInsertSale = require('../middlewares/validateInsertSale');

const router = express.Router();

router.get('/', controllers.salesContoller.getAll);

router.get('/:id', controllers.salesContoller.getById);

router.post('/', validateInsertSale.validateIdSale,
  validateInsertSale.validateQuantitySale,
  controllers.salesContoller.addSales);

module.exports = router;