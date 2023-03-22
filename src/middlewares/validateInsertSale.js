const models = require('../models');

const validateIdSale = async (req, res, next) => {
  const saleData = req.body;
  
  if (!saleData.every((sale) => sale.productId)) {
    res.status(400)
      .json({ message: '"productId" is required' });
    return;
  }

  const saleMap = await Promise.all(await saleData
    .map((element) => models.productModel.getById(element.productId)));

  if (!saleMap.every((element) => element !== undefined)) {
    res.status(404)
      .json({ message: 'Product not found' });
    return;
  }
  next();
};

const validateQuantitySale = (req, res, next) => {
  const saleData = req.body;

  if (!saleData.every((sale) => sale.quantity !== undefined)) {
    res.status(400)
      .json({ message: '"quantity" is required' });
    return;
  }
  if (saleData.every((sale) => sale.quantity < 1 || sale.quantity <= 0)) {
    res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
    return;
  }
  next();
};

module.exports = {
  validateIdSale,
  validateQuantitySale,
};