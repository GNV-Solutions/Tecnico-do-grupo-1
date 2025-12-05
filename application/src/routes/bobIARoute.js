const express = require("express");
const router = express.Router();
const bobIAController = require("../controllers/bobIAController");

router.post("/perguntar", bobIAController.gerarResposta);

module.exports = router;
