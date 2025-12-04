// posto.js (Model)
var database = require("../database/config");

function getResumoPosto(idPosto) {
    console.log("ACESSEI O POSTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getResumoPosto():", idPosto);
    
    var instrucaoSql = `
        SELECT
            p.rua, p.bairro, p.bandeira,
            (SELECT COUNT(*) FROM chamado WHERE id_posto = p.idPosto) AS totalChamados
        FROM posto p
        WHERE p.idPosto = ${idPosto};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(function (resultados) {
            return resultados[0];
        });
}

module.exports = {
    getResumoPosto
};