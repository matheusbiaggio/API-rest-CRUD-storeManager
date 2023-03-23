const services = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (req, res) => {
  const allSales = await services.salesService.getAll();

  res.status(200).json(allSales.message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await services.salesService.getById(id);

  if (sale.type) return res.status(404).json({ message: sale.message });

  res.status(200).json(sale.message);
};

const addSales = async (req, res) => {
  const saleData = req.body;
  const sale = await services.salesService.addSales(saleData);

  if (sale.type) return res.status(errorMap.mapError(sale.type)).json(sale);

  res.status(201).json(sale.message);
};

module.exports = {
  getAll,
  getById,
  addSales,
};