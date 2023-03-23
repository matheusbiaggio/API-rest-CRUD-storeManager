const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { salesContoller } = require('../../../src/controllers')
const { salesService } = require('../../../src/services');

const { sales, addSales } = require('../controllers/mocks/sales.controller.mock');

describe('SalesController - Teste a camada de Model', function () {
  describe('Testa se lista todas as vendas', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa se lista todas as vendas', async function () {
      sinon.stub(salesService, 'getAll').resolves({ type: null, message: sales });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesContoller.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    })
  })

  describe('Lista por id', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Lista a venda pelo id buscado', async function () {
      sinon.stub(salesService, 'getById').resolves(sales[2]);

      const req = { params: { id: 2 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesContoller.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
    })

    it('Verifica se é apresentado um erro ao inserir um id invalido', async function () {
      sinon.stub(salesService, 'getById').resolves({
        type: 'INVALID_ID',
        message: 'Sale not found',
      });

      const req = { params: { id: 2 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesContoller.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
    })
  })

  describe('Criação de uma nova venda', function () {
    afterEach(() => {
    sinon.restore()
    });

    it('Testa o retorno da venda criada', async function () {
      sinon.stub(salesService, 'addSales').resolves({ type: null, message: addSales});

      const req = { body: addSales};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesContoller.addSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(addSales);
    })

    it('Testa se retorna um erro ao inserir valores errados', async function () {
      sinon.stub(salesService, 'addSales').resolves({
        type: 'INVALID_VALUE',
        message: 'Erro ao inserir',
      });

      const req = { body: addSales};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesContoller.addSales(req, res);

      expect(res.status).to.have.been.calledWith(422);
    })
  } )
})