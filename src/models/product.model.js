const connecttion = require('./connection');

const findAll = async () => {
  const [result] = await connecttion.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connecttion.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

module.exports = {
  findAll,
  findById,
};