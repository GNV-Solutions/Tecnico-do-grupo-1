// dashboardRoutes.js
var express = require("express");
var router = express.Router();

var DashboardController = require("../controllers/DashboardController");

router.get("/", function (req, res) {
    DashboardController.dadosDashboard(req, res);
});

module.exports = router;