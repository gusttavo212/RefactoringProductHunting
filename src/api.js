const hapi = require('hapi');
const Context = require('./../src/db/base/contextStrategy');
const MongoDb = require('./../src/db/mongodb/mongodb');
const ProductSchema = require('./../src/db/mongodb/schemas/productSchema');
const ProductRoute = require('./../src/routes/productRoutes');
//DOCUMENTATION
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

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

    //DOCUMENTATION
    const swaggerOptions = {
        info: {
            title: 'API Products  -#gusttavo212',
            version: 'v1.0'
        },
        lang: 'pt'
    }
     //DOCUMENTATION
     //Plugins HAPI
    await app.register([        
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    //Plugins HAPI
   

    await app.start();
    console.log('Servidor rodando da porta', app.info.port);

    return app;
}

module.exports = main();