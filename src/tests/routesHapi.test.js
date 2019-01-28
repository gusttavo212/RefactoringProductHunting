const assert = require('assert');
const api = require('./../api');

let app = {};
const MOCK_PRODUCT_CADASTRAR = {
    title: 'Product Cadastrar TEST',
    description: 'Product Cadastrar TEST',
    url: 'Product Cadastrar TEST'
};

describe.only('Suite de testes da API PRODUCTHUNT', function () {
    this.beforeAll(async ()=> {
        app = await api;
        
    });

    it('Listar GET/product', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/product?skip=0&limit=3'
        });

        const dados = JSON.parse(result.payload);       
        assert.deepEqual(result.statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Cadastrar POST/product', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/product',
            payload: MOCK_PRODUCT_CADASTRAR
        });
        const _id = result.payload//Pegar o retorno do cadastrar que é o id
               
        
        assert.deepEqual(result.statusCode, 200);
        assert.notStrictEqual(_id, undefined)//ID não pode ser indefinido
    });
}) ;