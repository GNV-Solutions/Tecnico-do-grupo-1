var Medida = require("../models/Medida");
var Sensor = require("../models/sensor");

function dadosDashboard(req, res) {
    Sensor.getAll()
        .then(function (sensores) {
            var result = [];
            var promessas = [];

            for (var i = 0; i < sensores.length; i++) {
                var sensor = sensores[i];
                
                // Busca a última medida do sensor:
                var promessa = Medida.getUltimasMedidas(sensor.idSensor, 1)
                    .then(function (medidas) {
                        var porcentagem = 0;
                        
                        if (medidas.length > 0 && medidas[0].porcentagem_gas != undefined) {
                            porcentagem = Number(medidas[0].porcentagem_gas);
                        }

                        // Classificação
                        var status = "Seguro";
                        if (porcentagem >= 15) {
                            status = "Perigo";
                        } else if (porcentagem >= 11) {
                            status = "Atenção";
                        }

                        return {
                            idSensor: sensor.idSensor,
                            sensor: sensor.num_sensor,
                            posto: sensor.fkPosto_sensor,
                            porcentagem: porcentagem,
                            status: status
                        };
                    });
                
                promessas.push(promessa);
            }

            return Promise.all(promessas);
        })
        .then(function (resultados) {
            res.json(resultados);
        })
        .catch(function (erro) {
            console.log("Erro no DashboardController:", erro);
            res.status(500).json({ error: "Erro interno ao carregar dashboard" });
        });
}

module.exports = {
    dadosDashboard
};