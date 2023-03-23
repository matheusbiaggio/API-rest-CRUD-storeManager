const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const {
  sales,
  addSales,
  returnAddSales,
} = require('../controllers/mocks/sales.controller.mock');

describe('ModelSales - Teste a camada de Model', function () {
  describe('Testa se lista todas as vendas', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa se lista todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([sales])

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(sales);
    })
  })

  describe('Lista por id', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Lista a venda pelo id buscado', async function () {
      sinon.stub(connection, 'execute').resolves([sales[2]]);

      const result = await salesModel.getById(2);

      expect(result).to.be.deep.equal(sales[2]);
    })
  })

  describe('Criação de uma nova venda', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa se é inserido um id de uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await salesModel.insertIdSale();

      expect(result).to.be.equal(4);
    })

    it('Testa o retorno da venda criada', async function () {
      sinon.stub(connection, 'execute').resolves(returnAddSales.itemsSold);

      const result = await salesModel.addSales(addSales)

      expect(result.itemsSold).to.be.deep.equal(returnAddSales.itemsSold);
    })
  } )
})