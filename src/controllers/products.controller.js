const services = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await services.productService.getAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await services.productService.getById(id);
  if (product.type) return res.status(404).json(product);
  res.status(200).json(product.message);
};

const addProduct = async (req, res) => {
  const product = req.body;

  const productId = await services.productService.addProduct(product);

  if (productId.type) return res.status(errorMap.mapError(productId.type)).json(productId);

  res.status(201).json({ id: productId.message, name: product.name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const update = await services.productService.updateProduct(id, name);

  if (update.type) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await services.productService.deleteProduct(id);

  if (result.type) return res.status(404).json({ message: 'Product not found' });

  res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};