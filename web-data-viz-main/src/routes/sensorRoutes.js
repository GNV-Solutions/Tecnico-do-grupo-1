const express = require("express");
const router = express.Router();
const SensorController = require("../controllers/sensorController");

router.get("/", SensorController.listar);
router.get("/:idSensor", SensorController.buscar);

module.exports = router;
