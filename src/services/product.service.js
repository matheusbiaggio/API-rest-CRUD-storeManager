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

const addProduct = async (nameProduct) => {
  const newProduct = await models.productModel.addProduct(nameProduct);

  if (!newProduct) {
    return {
      type: 'INVALID_VALUE',
      message: 'Erro ao inserir',
    };
  }
  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const update = await models.productModel.updateProduct(id, name);

  if (update.affectedRows === 0) return { type: 'INVALID_ID', message: 'Product not found' };

  return { type: null, message: update };
};

const deleteProduct = async (id) => {
  const result = await models.productModel.deleteProduct(id);

  if (result.affectedRows === 0) return { type: 'INVALID_ID', message: 'Product not found' };

  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};