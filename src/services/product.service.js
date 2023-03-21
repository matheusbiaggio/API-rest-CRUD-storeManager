const models = require('../models');

const findAll = async () => {
  const products = await models.productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await models.productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};