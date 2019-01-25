//SEGUNDO
//RECEBE QUAL ESTRATEGIA DE BANCO DE DADOS VAI SER USADA

const ICrud = require('./../interfaces/interfaceCrud')

class ContextStrategy extends ICrud {
    constructor(strategy){//Recebe a estrategia de banco de dados que vai ser usada Classe abstrata
        super();
        this._database = strategy
    };

    create(item, skip, limit) {
        return this._database.create(item);
    };
    read(item, skip, limit) {
        return this._database.read(item, skip, limit);
    };
    update(id, item) {
        return this._database.update(id, item);
    };
    delete(id) {
        return this._database.delete(id);
    }
    isConnected() {
        return this._database.isConnected();
    };
    static connect() {
        return this._database.connect();
    };
    
};

module.exports = ContextStrategy;