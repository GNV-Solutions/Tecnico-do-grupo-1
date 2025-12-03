const db = require("../database/config");

module.exports = {
  async getAll() {
    const instrucao = `
      SELECT idSensor, num_sensor, fkPosto_sensor
      FROM arduinoSensor;
    `;
    return await db.executar(instrucao);
  },

  async getById(idSensor) {
    const instrucao = `
      SELECT idSensor, num_sensor, fkPosto_sensor
      FROM arduinoSensor
      WHERE idSensor = ${idSensor};
    `;
    const resultado = await db.executar(instrucao);
    return resultado[0];
  }
};
