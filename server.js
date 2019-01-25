const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')


//Iniciando o app
const app = express()
//Permitir o envio de json
app.use(express.json())
//Tornar a API publica
app.use(cors())


//Iniciando o DB
mongoose.connect('mongodb://gadsden:250433@localhost/nodeapi?authSource=admin&w=1', { useNewUrlParser: true })

requireDir('./src/models')


//Primeira rota
//toda vez que receber uma rota apartir de api mande para routes
app.use('/api', require("./src/models/routes"))

app.listen(3001)//HTTPS porta 403

