const Medida = require("../models/Medida");
const Sensor = require("../models/sensor");

module.exports = {
  async dadosDashboard(req, res) {
    try {
      const sensores = await Sensor.getAll();
      const result = [];

      for (const sensor of sensores) {

        // Busca a última medida do sensor:
        const medidas = await Medida.getUltimasMedidas(sensor.idSensor, 1);

        const porcentagem =
          medidas.length > 0 && medidas[0].porcentagem_gas !== null
            ? Number(medidas[0].porcentagem_gas)
            : 0;

        // Classificação
        const status =
          porcentagem >= 15
            ? "Perigo"
            : porcentagem >= 11
            ? "Atenção"
            : "Seguro";

        result.push({
          idSensor: sensor.idSensor,
          sensor: sensor.num_sensor,
          posto: sensor.fkPosto_sensor,
          porcentagem,
          status
        });
      }

      res.json(result);

    } catch (err) {
      console.error("Erro no DashboardController:", err);
      res.status(500).json({ error: "Erro interno ao carregar dashboard" });
    }
  }
};
