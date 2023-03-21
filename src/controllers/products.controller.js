const services = require('../services');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (req, res) => {
  const { type, message } = await services.productService.getAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await services.productService.getById(id);
  if (product.type) return res.status(404).json(product);
  res.status(200).json(product.message);
};

module.exports = {
  getAllProducts,
  getProductById,
};