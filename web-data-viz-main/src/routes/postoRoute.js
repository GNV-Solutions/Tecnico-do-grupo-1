var express = require('express');
var router = express();
var postoController = require('../controllers/postoController');

router.post('/cadastrar', function(req, res){
    postoController.InserirDadosPosto(req, res);
});

module.exports = router;
