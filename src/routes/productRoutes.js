const BaseRoute = require('./base/baseRoute');
const joi = require('joi');
const boom = require('boom');

const failAction = (request, headers, erro) => {
    throw erro;
}

class ProductRoute extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    };

    list() {
        return {
            path: '/product',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: joi.number().integer().default(0),
                        limit: joi.number().integer().default(10),
                        title: joi.string().min(1).max(50)
                    }
                }
            },
            //Permite pesquisa por title tambem com parte da palavra
            handler: (requrest, headers) => {
                try{
                    const {
                        title,
                        skip,
                        limit,
                    } = requrest.query;
                    const query = title ? {
                        title: {
                            $regex: `.*${title}*.`
                        }
                    } : {};

                    return this.db.read(
                        title ? query : {},
                        parseInt(skip),
                        parseInt(limit)
                    )

                }catch(error) {
                    console.log('Deu Ruim', error);
                    return 'Erro interno no servidor';
                }
            }
        }
    };

    create() {
        return{
            path: '/product',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        title: joi.string().required().min(3).max(50),
                        description: joi.string().required().min(5).max(200),
                        url: joi.string().required().min(5).max(100)
                    }
                }
            },
            handler: async (request) => {
                try{
                    const {
                        title,
                        description,
                        url,
                    } = request.payload;
                    const result = await this.db.create({
                        title,
                        description,
                        url
                    });
                    return result.id  //retorna o id do produto criado                
                                          

                }catch(error){
                    console.log('Erro interno', error);
                    return boom.internal();
                }
            }
        };
        
    };


    
};

module.exports = ProductRoute