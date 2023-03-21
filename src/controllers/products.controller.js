const services = require('../services');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (req, res) => {
  const { type, message } = await services.productService.findAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await services.findById(id);
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};