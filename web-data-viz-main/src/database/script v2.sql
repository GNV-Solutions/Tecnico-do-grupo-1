CREATE DATABASE gnv_solutions_v2;
USE gnv_solutions_v2;

-- tabela POSTO
CREATE TABLE posto (
idPosto INT AUTO_INCREMENT PRIMARY KEY,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
rua VARCHAR(50) NOT NULL,
bairro VARCHAR(50) NOT NULL,
cnpj CHAR(18) NOT NULL,
bandeira VARCHAR(45) DEFAULT 'Bandeira Branca/SemBandeira'
);

INSERT INTO posto (idPosto, rua, bairro, cnpj, bandeira) VALUES
(1, 'Rua das Flores, 120', 'Centro', '12.345.678/0001-99', 'Shell'),
(2, 'Av. Paulista, 900', 'Bela Vista', '98.765.432/0001-11', 'ararinhas azuis gasolinas top'),
(3, 'Rua Verde, 77', 'Jardim Esperança', '45.678.912/0001-22', DEFAULT);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(60) NOT NULL,
    fkPosto_funcionario INT NOT NULL,
    fkGerente INT NULL,
    CONSTRAINT fkPosto_funcionario FOREIGN KEY (fkPosto_funcionario) REFERENCES posto(idPosto),
    CONSTRAINT fkGerente FOREIGN KEY (fkGerente) REFERENCES funcionario(idFuncionario)
);

INSERT INTO funcionario (nome, email, senha, fkPosto_funcionario, fkGerente) VALUES
('carlos Aandrade', 'carlos.andrade@posto1.com', 'senha123', 1, NULL), 
('Julia ramos', 'julia.ramos@posto1.com', 'senha123', 1, 1),              
('Fernando lima', 'fernando.lima@posto2.com', 'senha456', 2, NULL),      
('beatriz Rocha', 'beatriz.rocha@posto2.com', 'senha456', 2, 3),        
('Rafaela nunes', 'rafaela.nunes@posto3.com', 'senha789', 3, NULL);   

-- tabela TECNICO
CREATE TABLE tecnico (
    id_tecnico INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO tecnico (nome, especialidade, telefone, email) VALUES
('Rafael oliveira', 'Sensores de temperatura', '(11) 99876-1234', 'rafael.oliveira@gnvsolutions.com'),
('camila Santos', 'Rede e conectividade', '(11) 98765-4321', 'camila.santos@gnvsolutions.com'),
('Bruno costa', 'Hardware ESP32', '(11) 97777-2222', 'bruno.costa@gnvsolutions.com'),
('larissa Almeida', 'Banco de dados e integração', '(11) 96666-1111', 'larissa.almeida@gnvsolutions.com');

-- tabela CHAMADO
CREATE TABLE chamado (
idChamado INT AUTO_INCREMENT PRIMARY KEY,
statusChamado VARCHAR(50) NOT NULL,
CONSTRAINT chk_Status_Chamado CHECK (statusChamado in('Em aberto', 'Em andamento', 'Concluido', 'Cancelado')),
prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('Baixa', 'Média', 'Alta')),
pkUsuario_chamado INT NOT NULL,
id_posto INT NOT NULL,
FOREIGN KEY (id_posto) REFERENCES posto(idPosto),
data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
dtManutencao DATE NOT NULL,
tipo_manutencao VARCHAR(50) NOT NULL,
responsavel VARCHAR(70) NOT NULL,
descricao TEXT NOT NULL
);

INSERT INTO chamado (
    statusChamado,
    prioridade,
    pkUsuario_chamado,
    id_posto,
    dtManutencao,
    tipo_manutencao,
    responsavel,
    descricao
) VALUES
('Em aberto', 'Alta', 1, 1, '2025-11-05', 'Substituição de sensor', 'joao Mendes', 'Sensor de temperatura parou de responder após queda de energia.'),
('Em andamento', 'Média', 2, 2, '2025-11-06', 'Ajuste de calibração', 'Marina souza', 'Leituras de temperatura estão variando acima do normal.'),
('Concluido', 'Baixa', 3, 1, '2025-10-30', 'Atualização de firmware', 'carlos Silva', 'Firmware do sensor atualizado para versão 2.1.'),
('Cancelado', 'Média', 4, 3, '2025-10-28', 'Verificação de comunicação', 'Felipe ramos', 'Chamado cancelado após diagnóstico remoto bem-sucedido.');

-- tabela TECNICO x CHAMADO
CREATE TABLE tecnico_chamado (
    id_tecnico INT NOT NULL,
    id_chamado INT NOT NULL,
    funcao_tecnico VARCHAR(50) NOT NULL,
    data_participacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_tecnico, id_chamado),
    FOREIGN KEY (id_tecnico) REFERENCES tecnico(id_tecnico),
    FOREIGN KEY (id_chamado) REFERENCES chamado(idChamado)
);

INSERT INTO tecnico_chamado (id_tecnico, id_chamado, funcao_tecnico) VALUES
(1, 1, 'Lider'),
(2, 1, 'Assistente'),
(3, 2, 'Lider'),
(4, 2, 'Suporte remoto'),
(2, 3, 'Suporte remoto'),
(1, 4, 'Assistente');

-- TABELA MÉDIDA
CREATE TABLE medida (
idMedida INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT NOT NULL,
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
num_sensor INT NOT NULL,
fkPosto_sensor INT,
CONSTRAINT fkPosto_sensor FOREIGN KEY (fkPosto_sensor) REFERENCES posto(idPosto)
) auto_increment = 100;

INSERT INTO arduinoSensor (idSensor, num_sensor, fkPosto_sensor) VALUES
(101, 1, 1),
(102, 2, 2),
(103, 3, 3);

-- PARA RECRIAR RÁPIDO
drop database gnv_solutions_v2;
