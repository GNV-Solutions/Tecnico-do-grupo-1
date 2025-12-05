var database = require("../database/config");

function getUltimasMedidas(idSensor, limite) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getUltimasMedidas():", idSensor, limite);

    var instrucaoSql = `
        SELECT porcentagem_gas, dtHora
        FROM medida
        WHERE fkSensor = ${idSensor}
        ORDER BY dtHora DESC
        LIMIT ${limite};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function getQuantidadeAlertas(idSensor) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAlertas():", idSensor);

    var instrucaoSql = `
        SELECT COUNT(*) FROM medida
        WHERE dtHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
	    AND porcentagem_gas >= 15
    `

    return database.executar(instrucaoSql);
}

function inserirMedida(idSensor, gas) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirMedida():", idSensor, gas);

    var instrucaoSql = `
        INSERT INTO medida (porcentagem_gas, fkSensor)
        VALUES (${gas}, ${idSensor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getUltimasMedidas,
    getQuantidadeAlertas,
    inserirMedida,
};
