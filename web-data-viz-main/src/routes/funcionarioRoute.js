var express = require('express');
var router = express();
var funcionarioController = require('../controllers/funcionariosController');

router.post('/cadastrar', function(req, res){
    funcionarioController.InserirDadosFuncionario(req, res);
});

router.post('/logar', function(req, res){
    funcionarioController.Logar(req, res);
});

router.post('/consultar', function(req, res){
    funcionarioController.ConsultarFuncionarios(req, res);
});

router.delete('/deletar/:idFuncionario', function(req, res){
    funcionarioController.DeletarFuncionario(req, res);
});

module.exports = router;
