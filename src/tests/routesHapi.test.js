const assert = require('assert');
const api = require('./../api');

let app = {};

describe.only('Suite de testes da API PRODUCTHUNT', function () {
    this.beforeAll(async ()=> {
        app = await api;
        
    });

    it('Listar /product', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/product?skip=0&limit=3'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    })
}) ;