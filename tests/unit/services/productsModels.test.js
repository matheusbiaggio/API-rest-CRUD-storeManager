const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { products } = require('../controllers/mocks/products.controller.mocks');

describe('Service - Teste a camada de Service', function () {
  describe('GetAll Products', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista todos os produtos', async function () {
      sinon.stub(productModel, 'getAll').resolves(products);
  
      const result = await productService.getAll();

      expect(result.message).to.equal(products);
    })
  })

  describe('Lista por id', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista o produto pelo id buscado', async function () {
      sinon.stub(productModel, 'getById').resolves(products[0]);
      
      const result = await productService.getById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(products[0]);
    });

    it('Retorna um erro ao não encontrar o id', async function () {
      sinon.stub(productModel, 'getById').resolves();
      
      const result = await productService.getById(5);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    });
  });
});