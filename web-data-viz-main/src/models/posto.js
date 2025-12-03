const database = require("../database/config");

module.exports = {
  getResumoPosto(idPosto) {
    const instrucao = `
      SELECT
        p.rua, p.bairro, p.bandeira,
        (SELECT COUNT(*) FROM chamado WHERE id_posto = p.idPosto) AS totalChamados
      FROM posto p
      WHERE p.idPosto = ${idPosto};
    `;

    return database.executar(instrucao).then(res => res[0]);
  }
};
