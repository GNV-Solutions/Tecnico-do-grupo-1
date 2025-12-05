var express = require('express')
var router = express.Router()
var bobIAController = require('../controllers/bobIAController')

router.post("/perguntar", async (req, res) => {
    var mensagem = req.body.pergunta
    var resposta = await bobIAController.gerarResposta(mensagem)
    res.send(resposta)
});
module.exports = router