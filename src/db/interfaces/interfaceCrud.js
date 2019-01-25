//PRIMEIRO 
//Caso o metodo não esteja implementado gera uma exception
class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
};

//Interface
class ICrud {//Crud quando não implementado
    create(item){
        throw new NotImplementedException();
    };

    read(query) {
        throw new NotImplementedException();
    };

    update(id, item) {
        throw new NotImplementedException();
    };

    delete(id) {
        throw new NotImplementedException();
    };

    isConnected() {
        throw new NotImplementedException();
    };
    connect() {
        throw new NotImplementedException();
    };
};

module.exports = ICrud;