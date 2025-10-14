-- Criação do banco de dados
-- CREATE DATABASE gnv_solutions_v1;
USE gnv_solutions_v1;

-- ==========================================
-- Tabela Usuário
-- ==========================================
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeResp VARCHAR(40),
dtRegistro DATETIME,
senha VARCHAR(25),
email VARCHAR(60)
);

INSERT INTO usuario (nomeResp, dtRegistro, senha, email) VALUES
('Bianca Silva', NOW(), 'bianca123', 'bianca.silva@email.com'),
('Marcos Santos', NOW(), 'marcos321', 'marcos.silva@email.com'),
('Ana Ferrari', NOW(), 'ana2025', 'ana.ferrari@email.com');

-- ==========================================
-- Tabela Chamado / Manutenção
-- ==========================================
CREATE TABLE chamadoManutencao (
idChamado INT,
fkUsuarioChamado INT,
CONSTRAINT pkUsuarioChamado 
	PRIMARY KEY (idChamado, fkUsuarioChamado),
dtManutencao DATE,
tipo_manutencao VARCHAR(50),
responsavel VARCHAR(70),
descricao TEXT
);

INSERT INTO chamadoManutencao (idChamado,dtManutencao, tipo_manutencao, responsavel, descricao, fkUsuarioChamado) VALUES
(1,'2025-09-15', 'Troca de Sensor', 'Carlos Souza', 'Sensor apresentou falha de leitura no posto Shell.', 1),
(2,'2025-09-20', 'Atualização de Firmware', 'Marcos Santos', 'Atualização do software do Arduino.', 2),
(3,'2025-10-01', 'Revisão de Sistema', 'Ana Ferrari', 'Verificação preventiva de sensores e válvulas.', 3);

-- ==========================================
-- Tabela Estoque / Lote
-- ==========================================
CREATE TABLE estoqueLote (
idEstoque INT PRIMARY KEY AUTO_INCREMENT,
qtdArduinos INT,
sensor_manutencao TINYINT,
arduino_manutencao TINYINT
);

INSERT INTO estoqueLote (qtdArduinos, sensor_manutencao, arduino_manutencao) VALUES
(20, 0, 0),
(15, 1, 0),
(10, 0, 1);

-- ==========================================
-- Tabela Posto
-- ==========================================
CREATE TABLE posto (
idPosto INT,
fkUsuarioPosto INT,
    CONSTRAINT pkUsuarioPosto 
			PRIMARY KEY (idPosto ,fkUsuarioPosto),
nome_posto VARCHAR(50),
dthora DATETIME
);

INSERT INTO posto (idPosto ,nome_posto, dthora, fkUsuarioPosto) VALUES
(1,'Posto Petrobrás', NOW(), 1),
(1,'Posto Shell', NOW(), 2),
(2,'Posto Ipiranga', NOW(), 3);

-- ==========================================
-- Tabela Arduino / Sensor
-- ==========================================
CREATE TABLE arduinoSensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
num_sensor INT,
porcentagem_gas DECIMAL(4,1),
dtHora_sensor DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuarioSensor INT,
	CONSTRAINT fkUsuario_sensor 
		FOREIGN KEY (fkUsuarioSensor)
			REFERENCES usuario(idUsuario),
fkChamadoSensor INT,
    CONSTRAINT fkChamadoSensor 
		FOREIGN KEY (fkChamadoSensor)
			REFERENCES chamadoManutencao(idChamado),
fkEstoqueSensor INT, 
	CONSTRAINT fkEstoqueSensor 
		FOREIGN KEY (fkEstoqueSensor)
			REFERENCES estoqueLote(idEstoque),
fkPostoSensor INT,
    CONSTRAINT fkPostoSensor 
		FOREIGN KEY (fkPostoSensor)
			REFERENCES posto (idPosto)    
);

INSERT INTO arduinoSensor (num_sensor, porcentagem_gas, fkUsuarioSensor, fkChamadoSensor, fkEstoqueSensor, fkPostoSensor) VALUES
(01, 2.5, 1, 1, 1, 1),
(01, 3.8, 1, 2, 2, 2),
(02, 1.2, 3, 3, 3, 2),
(03, 4.5, 1, NULL, 1, 1),
(04, 0.9, 2, NULL, 2, 2);

-- ==========================================
-- Verificar todas as tabelas e dados
-- ==========================================
SHOW TABLES;
truncate table usuario;
truncate table chamadoManutencao;
truncate table estoqueLote;
truncate table posto;
truncate table arduinoSensor;

drop table usuario;
drop table chamadoManutencao;
drop table estoqueLote;
drop table posto;
drop table arduinoSensor;

SELECT * FROM usuario;
SELECT * FROM chamadoManutencao;
SELECT * FROM estoqueLote;
SELECT * FROM posto;
SELECT * FROM arduinoSensor;

-- ======================
-- select
-- ======================

--  usuario com o posto
SELECT 
    a.idSensor AS 'Sensor',
    a.num_sensor AS 'Número do sensor',
    a.porcentagem_gas AS 'Porcentagem de vazamento',
    a.dtHora_sensor AS 'Data e hora do vazamento',
    u.nomeResp AS 'Responsavel',
    p.nome_posto AS 'Posto'
	FROM arduinoSensor AS a
JOIN usuario AS u
    ON a.fkUsuarioSensor = u.idUsuario
JOIN posto AS p
    ON a.fkPostoSensor = p.idPosto;

-- usuario chamado/manutenção
SELECT
    c.idChamado AS 'Chamando/Manutenção',
    c.dtManutencao AS 'Data e hora do chamado/manutenção',
    c.tipo_manutencao AS 'Tipo',
    c.responsavel AS 'Tecnico',
    c.descricao AS 'Detalhes',
    u.nomeResp AS 'Solicitante'
FROM chamadoManutencao AS c
JOIN usuario AS u
    ON c.fkUsuarioChamado = u.idUsuario;

-- estoque e sensor
SELECT
    e.idEstoque AS 'Estoque',
    e.qtdArduinos AS 'Quantidade total de arduinos no estoque',
    e.sensor_manutencao AS 'Sensores em manutenção',
    e.arduino_manutencao AS 'Arduino em manutenção',
    a.num_sensor AS 'Número do sensor/arduino',
    a.porcentagem_gas AS 'Porcentagem do vazamento'
FROM estoqueLote AS e
LEFT JOIN arduinoSensor AS a
    ON e.idEstoque = a.fkEstoqueSensor;
    
-- sensor + chamado/manutenção
SELECT
    a.idSensor AS 'Sensor',
    a.num_sensor AS 'Número sensor',
    a.porcentagem_gas AS 'Porcentagem do gás',
    c.tipo_manutencao AS 'Tipo de chamado/manutenção',
    c.responsavel AS 'Responsavel do chama',
    c.dtManutencao AS 'Data da manutenção'
FROM arduinoSensor AS a
LEFT JOIN chamadoManutencao AS c
    ON a.fkChamadoSensor = c.idChamado;
    
-- visão geral 
SELECT
    a.idSensor AS 'Sensor',
    a.num_sensor  AS 'Número sensor',
    a.porcentagem_gas AS 'Porcentagem do gás',
    u.nomeResp AS 'Responsavel',
    p.nome_posto AS'Posto',
    e.qtdArduinos AS 'Quantidade de sensor e arduino no estoque',
    c.tipo_manutencao AS 'Tipo de chamado/manutenção',
    c.responsavel AS 'Responsavel do posto'
FROM arduinoSensor AS a
JOIN usuario AS u
    ON a.fkUsuarioSensor = u.idUsuario
JOIN posto AS p
    ON a.fkPostoSensor = p.idPosto
LEFT JOIN estoqueLote AS e
    ON a.fkEstoqueSensor = e.idEstoque
LEFT JOIN chamadoManutencao AS c
    ON a.fkChamadoSensor = c.idChamado;





