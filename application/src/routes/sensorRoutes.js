var express = require("express");
var router = express.Router();

var SensorController = require("../controllers/sensorController");

router.get("/", function (req, res) {
    SensorController.listar(req, res);
});

router.get("/:idSensor", function (req, res) {
    SensorController.buscar(req, res);
});

module.exports = router;
