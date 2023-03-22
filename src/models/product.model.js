const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return result;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const addProduct = async (nameProduct) => {
  const columns = Object.keys(nameProduct).join(', ');

  const placeholders = Object.keys(nameProduct)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId: results }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(nameProduct)],
  );

  return results;
};

module.exports = {
  getAll,
  getById,
  addProduct,
};