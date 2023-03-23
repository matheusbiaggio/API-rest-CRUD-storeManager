const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { sales, addSales } = require('../controllers/mocks/sales.controller.mock');

describe('ModelSales - Teste a camada de Model', function () {
  describe('Testa se lista todas as vendas', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa se lista todas as vendas', async function () {
      sinon.stub(salesModel, 'getAll').resolves(sales);

      const result = await salesService.getAll();

      expect(result.message).to.equal(sales);
    })
  })

  describe('Lista por id', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Lista a venda pelo id buscado', async function () {
      sinon.stub(salesModel, 'getById').resolves([sales[2]]);

      const result = await salesService.getById(2);
      
      expect(result.type).to.equal(null)
    })
  })

  describe('Criação de uma nova venda', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa o retorno da venda criada', async function () {
      sinon.stub(salesModel, 'addSales').resolves(addSales);

      const result = await salesService.addSales(addSales);
      
      expect(result.type).to.equal(null)
    })

    it('Testa se retorna um erro ao inserir valores errados', async function () {
      sinon.stub(salesModel, 'addSales').resolves();

      const result = await salesService.addSales(addSales);
      
      expect(result.type).to.equal('INVALID_VALUE');
    })
  } )
})