const express = require("express");
const router = express.Router();
const MedidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensor", MedidaController.ultimas);
router.post("/inserir/:idSensor", MedidaController.inserir);

module.exports = router;
