const mongoose = require('mongoose')

const Filme = mongoose.model('Filme',{
     nome : String,
    categoria: String,
})

module.exports = Filme