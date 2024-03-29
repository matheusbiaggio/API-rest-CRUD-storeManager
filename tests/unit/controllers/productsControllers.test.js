const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);
const { productService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { products } = require('./mocks/products.controller.mocks');

describe('Products - Teste a camada de controller', function () {
  describe('Lista todos os produtos', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista todos os produtos', async function () {
      sinon.stub(productService, 'getAll').resolves({ type: null, message: products });
  
      const req = {};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('Retorna um erro ao não encontrar', async function () {
      sinon.stub(productService, 'getAll')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  
      const req = {};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
    })

  })

  describe('Lista por id', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Lista o produto pelo id buscado', async function () {
      sinon.stub(productService, 'getById').resolves({ type: null, message: products[0] });
  
      const req = { params: { id: 1 }};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('Retorna um erro ao não encontrar o id', async function () {
      sinon.stub(productService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  
      const req = { params: { id: 1 }};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getById(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
    });
  })

  describe('Adiciona um produto', function () {
    afterEach(() => {
      sinon.restore()
    });

    it('Verifica se é adicionado um produto passando o nome como parametro', async function () {
      sinon.stub(productService, 'addProduct').resolves({ type: null, message: {id: 99, name: 'Teste'} });
      
      const req = { body: { name: 'Teste' }};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.addProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({id: {id: 99, name: 'Teste'}, name: 'Teste'});
    });

    it('Retorna um erro ao inserir o name de forma erronea', async function () {
      sinon.stub(productService, 'addProduct').resolves({
        type: 'INVALID_VALUE',
        message: 'Erro ao inserir',
      });
      
      const req = { body: { name: 'Teste' }};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.addProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(422);
    });
  });
});