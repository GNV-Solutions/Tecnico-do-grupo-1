var iaModel = require('../models/bobIAModel');

function GerarResposta(req, res) {
  var pergunta = req.body.perguntaServer;
  iaModel
    .GerarResposta(pergunta)
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).json({ resultado: resposta });
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro ao gerar resposta da IA' });
    });
}

module.exports = {
  GerarResposta
};
