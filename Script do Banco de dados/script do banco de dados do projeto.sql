-- Criação do banco de dados
CREATE DATABASE gnv_solutions_v2;
USE gnv_solutions_v2;

-- TABELA USUÁRIO
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeResp VARCHAR(140),
dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
senha VARCHAR(25),
email VARCHAR(60)
);

INSERT INTO usuario (nomeResp, dtRegistro, senha, email) VALUES
('Bianca Silva', NOW(), 'bianca123', 'bianca.silva@email.com'),
('Marcos Santos', NOW(), 'marcos321', 'marcos.silva@email.com'),
('Ana Ferrari', NOW(), 'ana2025', 'ana.ferrari@email.com');


-- TABELA POSTO
CREATE TABLE posto (
idPosto INT AUTO_INCREMENT,
pkUsuario_posto INT,
CONSTRAINT pkUsuario_posto
    PRIMARY KEY (idPosto, pkUsuario_posto),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
idSensor INT,
rua VARCHAR(50),
bairro VARCHAR(50),
cnpj CHAR(18),
numero_do_dispenser INT
);


INSERT INTO posto (pkUsuario_posto, idSensor, rua, bairro, cnpj, numero_do_dispenser) VALUES
(1, 1, 'Rua das Flores, 120', 'Centro', '11.111.111/0001-11', 4),
(2, 2, 'Av. Paulista, 900', 'Bela Vista', '22.222.222/0001-22', 2),
(3, 3, 'Rua Verde, 77', 'Jardim Esperança', '33.333.333/0001-33', 6);

-- TABELA CHAMADO
CREATE TABLE chamado (
idChamado INT AUTO_INCREMENT,
pkUsuario_chamado INT,
CONSTRAINT pkUsuario_chamado
    PRIMARY KEY (idChamado, pkUsuario_chamado),
dtManutencao DATE,
tipo_manutencao VARCHAR(50),
responsavel VARCHAR(70),
descricao TEXT
);

INSERT INTO chamado (idChamado,dtManutencao, tipo_manutencao, responsavel, descricao, pkUsuario_chamado) VALUES
(1,'2025-09-15', 'Troca de Sensor', 'Carlos Souza', 'Sensor apresentou falha de leitura no posto Shell.', 1),
(2,'2025-09-20', 'Atualização de Firmware', 'Marcos Santos', 'Atualização do software do Arduino.', 2),
(3,'2025-10-01', 'Revisão de Sistema', 'Ana Ferrari', 'Verificação preventiva de sensores e válvulas.', 3);

-- TABELA ESTOQUE/LOTE
CREATE TABLE estoque (
idEstoque INT PRIMARY KEY AUTO_INCREMENT,
qtdArduinos INT,
sensor_manutencao TINYINT,
status_sensor VARCHAR(10),
CONSTRAINT chkStatus_sensor
    CHECK (status_sensor IN ('Inativo','Ativo'))
);

INSERT INTO estoque (qtdArduinos, sensor_manutencao, status_sensor) VALUES
(20, 0, 'Ativo'),
(15, 1, 'Inativo'),
(10, 0, 'Ativo');


-- TABELA MÉDIA
CREATE TABLE medida (
idMedida INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT,
porcentagem_gas DECIMAL(4,1),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medida (fkSensor, porcentagem_gas) VALUES
(1, 36.5),
(1, 39.2),
(2, NULL),
(2, NULL),
(3, 10.6),
(3, 2.0);

-- TABELA ARDUINO SENSOR
CREATE TABLE arduinoSensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
num_sensor INT,
fkUsuario_sensor INT,
CONSTRAINT fkUsuario_sensor
    FOREIGN KEY (fkUsuario_sensor)
        REFERENCES usuario (idUsuario),
fkEstoque_sensor INT,
CONSTRAINT fkEstoque_sensor
    FOREIGN KEY (fkEstoque_sensor)
        REFERENCES estoque (idEstoque),
fkPosto_sensor INT,
CONSTRAINT fkPosto_sensor
    FOREIGN KEY (fkPosto_sensor) 
        REFERENCES posto(idPosto),
fkChamado_sensor INT,    
    FOREIGN KEY (fkChamado_sensor) 
        REFERENCES chamado(idChamado)
);

INSERT INTO arduinoSensor (num_sensor, fkUsuario_sensor, fkEstoque_sensor, fkPosto_sensor, fkChamado_sensor) VALUES
(101, 1, 1, 1, 1),
(102, 2, 2, 2, 2),
(103, 3, 3, 3, 3);


-- Verificar todas as tabelas e dados
SHOW TABLES;



/*
truncate table usuario;
truncate table chamado;
truncate table estoque;
truncate table posto;
truncate table arduinoSensor;
truncate table medida;

drop table usuario;
drop table chamado;
drop table estoque;
drop table posto;
drop table arduinoSensor;
drop table medida;


SELECT * FROM usuario;
SELECT * FROM chamado;
SELECT * FROM estoque;
SELECT * FROM posto;
SELECT * FROM arduinoSensor;
SELECT * FROM medida;
*/
-- ===============
-- SELECT COM JOIN 
-- ===============

-- usuário x posto
SELECT 
    u.idUsuario "Usuário",
    u.nomeResp AS "Responsavel",
    p.idPosto AS "idPosto",
    p.rua AS "Rua do Posto",
    p.bairro AS "Bairro do Posto",
    p.cnpj AS "CNPJ",
    p.dtHora AS "Data e hora do cadastro"
FROM usuario u
JOIN posto p 
    ON u.idUsuario = p.pkUsuario_posto;

--  usuário x chamado
SELECT 
    u.nomeResp AS "Responsavel",
    c.idChamado AS "Chamado",
    c.tipo_manutencao AS "Tipo da Manutenção",
    c.responsavel AS "Responsável do Posto",
    c.dtManutencao AS "Data manutenção",
    c.descricao AS "Descrição"
FROM usuario u
JOIN chamado c 
    ON u.idUsuario = c.pkUsuario_chamado;

-- posto x sensor
SELECT
    p.idPosto AS "idPosto",
    p.rua AS "Rua do Posto",
    p.bairro AS "Bairro do Posto",
    a.idSensor AS "Sensor",
    p.numero_do_dispenser AS "Número do dispenser que está localizado",
    a.num_sensor AS "Número do sensor"
FROM posto p
JOIN arduinoSensor a 
    ON p.idPosto = a.fkPosto_sensor;

-- sensor x medida
SELECT
    a.idSensor AS "Sensor",
    a.num_sensor AS "Número Sensor",
    m.porcentagem_gas AS "Porcentagem de Vazamento",
    m.dtHora AS "Data e Hora do vazamento"
FROM arduinoSensor a
JOIN medida m 
    ON a.idSensor = m.fkSensor
ORDER BY a.idSensor, m.dtHora;

-- sensor x estoque
SELECT
    a.idSensor AS "Sensor",
    a.num_sensor AS "Número do Sensor",
    e.qtdArduinos AS "Quantidade de arduino",
    e.status_sensor AS "Status do Sensor",
    e.sensor_manutencao AS "Sensores em Manutenção"
FROM arduinoSensor a
JOIN estoque e 
    ON a.fkEstoque_sensor = e.idEstoque;

-- Join Geral
SELECT
    u.nomeResp AS "Responsavel",
    u.email AS "Email do usuário",
    p.rua AS "Rua do posto",
    p.bairro AS "Bairro do Posto",
    p.numero_do_dispenser AS "Número do dispenser que está localizado",
    a.num_sensor AS "Número do sensor",
    e.qtdArduinos AS "Quantidade no estoque",
    e.status_sensor AS "Status do sensor",
    m.porcentagem_gas AS "Nível de vazamento de gás",
    m.dtHora AS "Data e Hora do vazamento",
    c.tipo_manutencao AS "Tipo de manutenção",
    c.responsavel AS "Responsavél do posto",
    c.dtManutencao AS "Data e hora do chamado"
FROM usuario u
JOIN posto p ON u.idUsuario = p.pkUsuario_posto
JOIN arduinoSensor a ON p.idPosto = a.fkPosto_sensor
JOIN estoque e ON a.fkEstoque_sensor = e.idEstoque
JOIN medida m ON a.idSensor = m.fkSensor
JOIN chamado c ON a.fkChamado_sensor = c.idChamado
ORDER BY u.nomeResp, a.num_sensor, m.dtHora;

-- join com filtro (somente com manutenção ativa)
SELECT
    u.nomeResp AS "Responsável",
    a.num_sensor AS "Número do sensor",
    e.status_sensor AS "Status do sensor",
    e.sensor_manutencao AS "Sensores em Manutenção",
    c.tipo_manutencao AS "Tipo de manutenção",
    c.dtManutencao "Data e hora do chamado"
FROM usuario u
JOIN arduinoSensor a ON u.idUsuario = a.fkUsuario_sensor
JOIN estoque e ON a.fkEstoque_sensor = e.idEstoque
JOIN chamado c ON a.fkChamado_sensor = c.idChamado
WHERE e.sensor_manutencao = 1;
 
 -- join com case de vazamento de gás
 SELECT 
    u.nomeResp AS 'Responsável',
    p.rua AS 'Local do Posto',
    a.num_sensor AS 'Número do Sensor',
    m.porcentagem_gas AS 'Porcentagem de Gás(%)',
    m.dtHora AS 'Data e Hora do vazamento',
    CASE
        WHEN m.porcentagem_gas < 5 THEN 'BOM'
        WHEN m.porcentagem_gas BETWEEN 5 AND 15 THEN 'PREOCUPANTE' -- BETWEEN (entre)
        WHEN m.porcentagem_gas > 15 THEN 'GRAVE'
        ELSE 'DESATIVADO'
    END AS 'Status do Gás'
FROM medida m
JOIN arduinoSensor a 
    ON m.fkSensor = a.idSensor
JOIN usuario u 
    ON a.fkUsuario_sensor = u.idUsuario
JOIN posto p 
    ON a.fkPosto_sensor = p.idPosto
ORDER BY m.dtHora DESC;
