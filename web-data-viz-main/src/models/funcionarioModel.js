var database = require('../database/config');

function InserirDadosFuncionario(nome, email, senha, fkPosto, fkGerente) {
  console.log(`ESTOU TENTANDO INSERIR DADOS FUNCIONARIO\n \n\t\t >> `);

  var fkGerenteValue = fkGerente ? fkGerente : 'NULL';

  var instrucao = `
    INSERT INTO funcionario(nome, email, senha, fkPosto_funcionario, fkGerente)
    VALUES
    ('${nome}', '${email}', '${senha}', ${fkPosto}, ${fkGerenteValue});
  `;
  return database.executar(instrucao);
}

function Logar(email, senha) {
  console.log(`ESTOU TENTANDO LOGAR FUNCIONARIO\n \n\t\t >> `);
  var instrucao = `
    SELECT
      f.idFuncionario,
      f.nome,
      f.email,
      f.fkPosto_funcionario,
      f.fkGerente,
      p.bandeira,
      p.cnpj,
      p.rua,
      p.bairro
    FROM funcionario f
    JOIN posto p ON f.fkPosto_funcionario = p.idPosto
    WHERE f.email = '${email}' AND f.senha = '${senha}';
  `;
  return database.executar(instrucao);
}

function ConsultarFuncionarios(fkPosto) {
  console.log(`ESTOU TENTANDO CONSULTAR FUNCIONARIOS\n \n\t\t >> `);
  var instrucao = `
    SELECT
      idFuncionario,
      nome,
      email,
      fkGerente
    FROM funcionario
    WHERE fkPosto_funcionario = ${fkPosto};
  `;
  return database.executar(instrucao);
}

function DeletarFuncionario(id) {
    console.log(`ESTOU TENTANDO DELETAR FUNCIONARIO\n \n\t\t >> `);

    var instrucaoAtualizarVinculo = `
      UPDATE funcionario
      SET fkGerente = NULL
      WHERE fkGerente = ${id};
    `;

    var instrucaoDeletar = `
      DELETE FROM funcionario
      WHERE idFuncionario = ${id};
    `;

    return database.executar(instrucaoAtualizarVinculo)
      .then(function() {
        return database.executar(instrucaoDeletar);
      })
    }

module.exports = {
  InserirDadosFuncionario,
  Logar,
  ConsultarFuncionarios,
  DeletarFuncionario
};
