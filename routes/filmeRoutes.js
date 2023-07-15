const router = require('express').Router()


//Create
const Filme = require("../models/Filme");

router.post('/add-filme', async (req, res) => {

    //Req.bory
    //{nome:Rambo, categoria:ação, approved: true}
    const {nome, categoria} = req.body

    //Se nome for falso
    if (!nome){
        res.status(400).json({message:'O nome não foi enserido!'})
    }

    const filme ={
        nome,
        categoria
    }

    //create
    try {
        await  Filme.create(filme)
        res.status(201).json({message:'Foi adicionado mais um filme na lista!'})
    }catch (error){
        res.status(500).json({error:'Não foi possivel adicionar um filme na lista!'})
    }
})

//Reade - Leitura de Dados
router.get('/busca-filmes', async (req, res)=>{
    try {
        const filme = await Filme.find()
        res.status(200).json(filme)

    }catch (error) {
        res.status(404).json({message: 'Nenhum filme foi encontrado!'})
    }
})

//Rotas dinamica
router.get('/:id', async (req, res) =>{

    //extrair o dado de requisição, pela url = req.params
    const id = req.params.id

    //_id -> Porque é a forma que o mongeDB Atlas reconhece.
    try {
       const filme = await Filme.findOne({_id:id})
        res.status(200).json(filme)
    }catch (error) {
        res.status(404).json({message:'Esse filme não foi encontrado!'})
    }
})

//Update - atualização de dados: Put and Patch.
// Put: Atualiza todo conteudo
//Patch: Atualiza somente um dado de todo conteudo

router.patch('/:id', async (req, res) =>{
    const id = req.params.id

    const {nome, categoria} = req.body

    const filme={
        nome,
        categoria,
    }

    try {
        const updateFilm = await Filme.updateOne({_id: id}, filme)

        if (updateFilm.matchedCount === 0){
            res.status(422).json({message: 'O filme não foi encontrado!'})
            return
        }

        res.status(200).json(filme)
    }catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/apaga-filme/:id', async (req,res)=>{

    const id = req.params.id

    const filme = await  Filme.findOne({_id: id})

    if (!filme){
        res.status(422).json({message: 'Filme não encontrado!'})
        return
    }

    try {

        await Filme.deleteOne({_id: id})

        res.status(200).json({message: 'Filme removido!'})

    }catch (error) {
        res.status(500).json({error:error})
    }
})


module.exports = router