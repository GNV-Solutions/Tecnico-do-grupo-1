var express = require('express');
var router = express();
var iaController = require('../controllers/bobIAController');

router.post('/perguntar', function(req, res){
    iaController.GerarResposta(req, res);
});

module.exports = router;
