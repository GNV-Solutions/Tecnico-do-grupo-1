const Medida = require("../models/Medida");

module.exports = {
  async ultimas(req, res) {
    try {
      const { idSensor } = req.params;
      const medidas = await Medida.getUltimasMedidas(idSensor, 10);
      res.json(medidas);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async inserir(req, res) {
    try {
      const { idSensor } = req.params;
      const { gas } = req.body;

      await Medida.inserirMedida(idSensor, gas);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
