var Sensor = require("../models/sensor");

function listar(req, res) {
    Sensor.getAll()
        .then(function (sensores) {
            res.json(sensores);
        })
        .catch(function (erro) {
            res.status(500).json({ error: erro });
        });
}

function buscar(req, res) {
    var idSensor = req.params.idSensor;

    Sensor.getById(idSensor)
        .then(function (sensor) {
            res.json(sensor);
        })
        .catch(function (erro) {
            res.status(500).json({ error: erro });
        });
}

module.exports = {
    listar,
    buscar
};
