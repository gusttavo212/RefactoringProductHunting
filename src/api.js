const hapi = require('hapi');
const Context = require('./../src/db/base/contextStrategy');
const MongoDb = require('./../src/db/mongodb/mongodb');
const ProductSchema = require('./../src/db/mongodb/schemas/productSchema');
const ProductRoute = require('./../src/routes/productRoutes');

const app = new hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
};

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, ProductSchema));
    app.route([
        ...mapRoutes(new ProductRoute(context), ProductRoute.methods())
    ]);

    await app.start();
    console.log('Servidor rodando da porta', app.info.port);

    return app;
}

module.exports = main();