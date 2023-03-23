const models = require('../models');

const getAll = async () => {
  const allSales = await models.salesModel.getAll();

  return { type: null, message: allSales };
};

const getById = async (id) => {
  const sale = await models.salesModel.getById(id);

  if (!sale[0]) return { type: 'INVALID_ID', message: 'Sale not found' };

  return { type: null, message: sale };
};

const addSales = async (salesData) => {
  const newSale = await models.salesModel.addSales(salesData);

  if (!newSale) {
    return {
      type: 'INVALID_VALUE',
      message: 'Erro ao inserir',
    };
  }
  return { type: null, message: newSale };
};

module.exports = {
  getAll,
  getById,
  addSales,
};