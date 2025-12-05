const database = require("../database/config");
function getResumoPosto(idPosto) {
    const instrucao = `
      SELECT
        p.rua, p.bairro, p.bandeira,
        (SELECT COUNT(*) FROM chamado WHERE id_posto = p.idPosto) AS totalChamados
      FROM posto p
      WHERE p.idPosto = ${idPosto};
    `;

    return database.executar(instrucao).then(res => res[0]);
  };
  function InserirDadosPosto(nomePosto, bandeira, cnpj, cep, numero) {
    console.log(`ESTOU TENTANDO INSERIR DADOS POSTO\n \n\t\t >> `);
    var instrucao = `
      INSERT INTO posto(nomePosto, bandeira, cnpj , cep, numero)
      VALUES
      ('${nomePosto}', '${bandeira}', '${cnpj}', '${cep}', '${numero}');
    `;
    return database.executar(instrucao);
  }

  module.exports = {
    InserirDadosPosto,
    getResumoPosto
  };

