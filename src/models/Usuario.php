<?php
// src/models/Usuario.php

class Usuario {
    private $conn;
    private $table = 'usuarios';

    public $id;
    public $nome;
    public $email;
    public $senha;
    public $tipo;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function criarUsuario() {
        $query = "INSERT INTO " . $this->table . " (nome, email, senha, tipo) VALUES (:nome, :email, :senha, :tipo)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':senha', password_hash($this->senha, PASSWORD_BCRYPT));
        $stmt->bindParam(':tipo', $this->tipo);

        return $stmt->execute();
    }

    public function autenticarUsuario($email, $senha) {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usuario && password_verify($senha, $usuario['senha'])) {
            $this->id = $usuario['id'];
            $this->nome = $usuario['nome'];
            $this->email = $usuario['email'];
            $this->tipo = $usuario['tipo'];
            return true;
        }
        return false;
    }
}
?>
