const BaseRoute = require('./base/baseRoute');
const joi = require('joi');

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
                        title: joi.string().min(3).max(100)
                    }
                }
            },
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
    }
    
};

module.exports = ProductRoute