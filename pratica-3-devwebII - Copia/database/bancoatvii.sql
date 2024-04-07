ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fatec';
DROP DATABASE IF EXISTS devweb;

create database if not exists devweb;
use devweb;

CREATE TABLE if not exists cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    rg VARCHAR(20),
    cpf VARCHAR(20),
    telefone VARCHAR(20)
);

CREATE TABLE if not exists pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    descricao VARCHAR(255),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

INSERT INTO cliente (nome, rg, cpf, telefone) VALUES ('Sophia Pussati', '123456', '123.456.789-10', '(11) 1234-5678');

INSERT INTO pedido (cliente_id, descricao) VALUES (1, 'Construtora');




