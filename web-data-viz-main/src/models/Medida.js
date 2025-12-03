const db = require("../database/config");

module.exports = {
  async getUltimasMedidas(idSensor, limite) {
    const instrucao = `
      SELECT porcentagem_gas, dtHora
      FROM medida
      WHERE fkSensor = ${idSensor}
      ORDER BY dtHora DESC
      LIMIT ${limite};
    `;
    return await db.executar(instrucao);
  },

  async inserirMedida(idSensor, gas) {
    const instrucao = `
      INSERT INTO medida (porcentagem_gas, fkSensor)
      VALUES (${gas}, ${idSensor});
    `;
    return await db.executar(instrucao);
  }
};
