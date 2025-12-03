const Sensor = require("../models/sensor");

module.exports = {
  async listar(req, res) {
    try {
      const sensores = await Sensor.getAll();
      res.json(sensores);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async buscar(req, res) {
    try {
      const sensor = await Sensor.getById(req.params.idSensor);
      res.json(sensor);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
