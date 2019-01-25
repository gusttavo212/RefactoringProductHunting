const assert = require('assert');
const MongoDb = require('./../db/mongodb/mongodb');
const ProductSCHEMA = require('./../db/mongodb/schemas/productSchema');
const Context = require('./../db/base/contextStrategy');

const MOCK_PRODUCT_CADASTRAR = {
    title: "cadastrar",
    description: "teste de cadastro",    
    url: "URL teste cadastro"    
}

describe('MongoDB Suite de Testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect();//Conectar cm mongodb CONECTION TEST
        context = new Context(new MongoDb(connection, ProductSCHEMA));//Passar o contexto do banco CONECTION TEST      
    });

    it('Teste de conexão', async () => {
        const result = await context.isConnected();//Resultado da conexão
        
        const expected = 'Conectado';//Resultado esperado

        assert.deepEqual(result, expected);
    });

    it("Cadastrar", async () => {
        const { title, description, url } = await context.create(MOCK_PRODUCT_CADASTRAR);

        assert.deepEqual({ title, description, url }, MOCK_PRODUCT_CADASTRAR);
    });

});