const ICrud = require('./../interfaces/interfaceCrud');
const mongoose = require('mongoose');
const conectionSTATUS = {
    0: "Disconectado",
    1: "Conectado",
    2: "Conectando",
    3: "Disconectado"
};

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
    };

    async isConnected() {
        const state = conectionSTATUS[this._connection.readyState];
        if (state === "Conectado") return state;

        if (state !== "Conectando") return state;

        await new Promise(resolve => setTimeout(resolve, 1000)); //Promise de conexão

        return conectionSTATUS[this._connection.readyState];
    };

    static connect() {
        mongoose.connect(
            "mongodb://gadsden:250433@localhost/productRefat?authSource=admin&w=1",
            { useNewUrlParser: true },
            function(error) {
              if (!error) return;
              console.log("Falha na conexão", error);
            }
          );

          const connection = mongoose.connection;
          connection.once("open", () => console.log("Database MONGODB CONECTADO"));

          return connection; //Manda para ICrud class gera o connection e o _connection recebe
    };

    create(item) {
        return this._schema.create(item);
    };

    read(query, skip=0, limit=10) {
        return this._schema.find(query).skip(skip).limit(limit);
    };

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    };
};

module.exports = MongoDB;