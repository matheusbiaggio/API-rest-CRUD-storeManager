const sales = [
  {
    "sale_id": 1,
    "product_id": 1,
    "quantity": 5
  },
  {
    "sale_id": 1,
    "product_id": 2,
    "quantity": 10
  },
  {
    "sale_id": 2,
    "product_id": 3,
    "quantity": 15
  },
  {
    "sale_id": 3,
    "product_id": 2,
    "quantity": 5
  },
  {
    "sale_id": 3,
    "product_id": 1,
    "quantity": 1
  }
]

const addSales = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const returnAddSales = {
  id: 4,
  itemsSold: [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

module.exports = {
  sales,
  addSales,
  returnAddSales,
};