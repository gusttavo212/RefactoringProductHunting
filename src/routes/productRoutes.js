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
                tags: ['api'],
                description: 'Deve listar os produtos',
                notes: 'Pode paginar resultados e filtrar por nome',
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
                tags: ['api'],
                description: 'Deve cadastrar um produto',
                notes: 'Deve cadastrar produto por title, description e url',
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

    update() {
        return{
            path: '/product/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],  
                description: 'Deve atualizar produto por id',
                notes: 'Pode ser atualizado o title, description ou url',     
                validate: {
                    failAction,
                    payload: {
                        title: joi.string().min(3).max(50),//Lembrar de tirar o required
                        description: joi.string().min(5).max(200),
                        url: joi.string().min(5).max(100)
                    },
                    params: {
                        id: joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const payload = request.payload;
                    const id = request.params.id;
                    return this.db.update(id, payload)
                } catch (error) {
                    console.log('Error interno', error);
                    return boom.internal();
                }
            }
        }
    };

    delete() {
        return {
            path: '/product/{id}',
            method: 'DELETE',
            config: {
                tags:['api'],
               description: 'Deve deletar produto por id',
               notes: 'não deve deletar com id invalido',
                validate: {
                    failAction,
                    params: {
                        id: joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const id = request.params.id;
                    const result = await this.db.delete(id);
                    return result                    
                } catch (error) {
                    console.log('Erro interno', error);
                    return boom.internal();
                }
            }
        }
    }


    
};

module.exports = ProductRoute