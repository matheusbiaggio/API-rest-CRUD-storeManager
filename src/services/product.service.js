const models = require('../models');

const getAll = async () => {
  const products = await models.productModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const product = await models.productModel.getById(productId);
  if (!product) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
};