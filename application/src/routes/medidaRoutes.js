var express = require("express");
var router = express.Router();

var MedidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensor", function (req, res) {
    MedidaController.ultimas(req, res);
});

router.post("/inserir/:idSensor", function (req, res) {
    MedidaController.inserir(req, res);
});

module.exports = router;
