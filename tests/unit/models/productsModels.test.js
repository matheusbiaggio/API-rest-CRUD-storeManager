const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { products } = require('../controllers/mocks/products.controller.mocks');

describe('Model - Teste a camada de Model', function () {
  describe('Lista todos os produtos', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productModel.getAll();

      expect(result).to.be.deep.equal(products);
    })
  });

  describe('Lista por id', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista o produto pelo id buscado', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productModel.getById(1);

      expect(result).to.be.deep.equal(products[0]);
    });
  });

  describe('Adiciona um produto', function () {
    afterEach(() => {
      sinon.restore()
    });
      
    it('Verifica se é adicionado um produto passando o nome como parametro', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

      const result = await productModel.addProduct('Teste');
      
      expect(result).to.be.equal(5);
    })
  });
});