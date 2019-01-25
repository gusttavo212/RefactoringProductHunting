const assert = require('assert');
const MongoDb = require('./../db/mongodb/mongodb');
const ProductSCHEMA = require('./../db/mongodb/schemas/productSchema');
const Context = require('./../db/base/contextStrategy');

describe('MongoDB Suite de Testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect();//Conectar cm mongodb CONECTION TEST
        context = new Context(new MongoDb(connection, ProductSCHEMA));//Passar o contexto do banco CONECTION TEST      
    });

    it('Teste de conexão', async () => {
        const result = await context.isConnected();
        console.log('Resultado', result);
        const expected = 'Conectado';

        assert.deepEqual(result, expected);
    });

});