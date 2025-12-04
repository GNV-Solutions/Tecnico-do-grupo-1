// sensor.js (Model)
var database = require("../database/config");

function getAll() {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAll():");
    
    var instrucaoSql = `
        SELECT idSensor, num_sensor, fkPosto_sensor
        FROM arduinoSensor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getById(idSensor) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getById():", idSensor);
    
    var instrucaoSql = `
        SELECT idSensor, num_sensor, fkPosto_sensor
        FROM arduinoSensor
        WHERE idSensor = ${idSensor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(function (resultados) {
            return resultados[0];
        });
}

module.exports = {
    getAll,
    getById
};