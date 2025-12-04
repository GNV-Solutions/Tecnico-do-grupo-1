
var postoModel = require('../models/posto');
function InserirDadosPosto(req, res) {
  var nomePosto = req.body.nomePostoServer;
  var bandeira = req.body.bandeiraServer;
  var cnpj = req.body.cnpjServer;
  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;

  postoModel
    .InserirDadosPosto(nomePosto, bandeira, cnpj, rua, bairro)
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

module.exports = {
  InserirDadosPosto
};
