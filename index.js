require('dotenv').config()

//configuração inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Ler o Json
app.use(
    express.urlencoded({
        extended: true
    })
)
//iniciar o json
app.use(express.json());

//Adicina novos filmes
const filmeRoutes = require('./routes/filmeRoutes')
app.use('/filme', filmeRoutes)

//Porta de acesso.
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6hi28o2.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


