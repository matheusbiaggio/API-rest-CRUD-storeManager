const connection = require('./connection');

const getAll = async () => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return results;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT * FROM 
    StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
    WHERE sa.id = ?`,
    [id],
  );

  return result;
};

const insertIdSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  return insertId;
};

const addSales = async (salesData) => {
  const saleId = await insertIdSale();

  const results = await Promise.all(await salesData.map((element) => {
    connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, quantity, product_id) 
        VALUE (?, ?, ?)`,
      [saleId, element.quantity, element.productId],
    );
    return element;
  }));

  return { id: saleId, itemsSold: results };
};

module.exports = {
  getAll,
  getById,
  insertIdSale,
  addSales,
};