<?php
// config/database.php

class Database {
    private $host = 'localhost';
    private $db_name = 'nome_do_banco';
    private $username = 'usuario';
    private $password = 'senha';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }
        return $this->conn;
    }

    public function initializeDatabase() {
        $sql = "
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                tipo ENUM('admin', 'usuario') DEFAULT 'usuario',
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS eventos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                palestrante VARCHAR(100),
                data_evento DATETIME NOT NULL,
                local VARCHAR(100),
                capacidade INT DEFAULT 0,
                descricao TEXT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS presencas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                evento_id INT NOT NULL,
                confirmado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (evento_id) REFERENCES eventos(id)
            );
        ";

        try {
            $this->conn->exec($sql);
        } catch (PDOException $exception) {
            echo "Erro ao inicializar o banco de dados: " . $exception->getMessage();
        }
    }
}

// Inicializa a conexão e cria as tabelas
$database = new Database();
$database->getConnection();
$database->initializeDatabase();
?>
