// medidasController.js
var Medida = require("../models/Medida");

function ultimas(req, res) {
    var idSensor = req.params.idSensor;

    Medida.getUltimasMedidas(idSensor, 1)
        .then(function (medidas) {
            res.json(medidas);
        })
        .catch(function (erro) {
            res.status(500).json({ error: erro });
        });
}

function inserir(req, res) {
    var idSensor = req.params.idSensor;
    var gas = req.body.gas;

    Medida.inserirMedida(idSensor, gas)
        .then(function (resultado) {
            res.json({ success: true });
        })
        .catch(function (erro) {
            res.status(500).json({ error: erro });
        });
}

module.exports = {
    ultimas,
    inserir
};