var funcionarioModel = require('../models/funcionarioModel');

function InserirDadosFuncionario(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var fkPosto = req.body.fkPostoServer;
  var fkGerente = req.body.fkGerenteServer;

  funcionarioModel
    .InserirDadosFuncionario(nome, email, senha, fkPosto, fkGerente)
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

function Logar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  funcionarioModel
    .Logar(email, senha)
    .then(function (resposta) {
      if (resposta.length > 0) {
        res.status(200).send(resposta);
      } else {
        res.status(401).send("Email ou senha incorretos!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

function ConsultarFuncionarios(req, res) {
  var fkPosto = req.body.fkPostoServer;

  funcionarioModel
    .ConsultarFuncionarios(fkPosto)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

function DeletarFuncionario(req, res) {
  var id = req.params.idFuncionario;

  funcionarioModel
    .DeletarFuncionario(id)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

module.exports = {
  InserirDadosFuncionario,
  Logar,
  ConsultarFuncionarios,
  DeletarFuncionario
};
