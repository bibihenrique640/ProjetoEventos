<?php
//Evento.php

// src/models/Evento.php

class Evento {
    private $conn;
    private $table = 'eventos';

    public $id;
    public $nome;
    public $palestrante;
    public $data_evento;
    public $local;
    public $capacidade;
    public $descricao;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function criarEvento() {
        $query = "INSERT INTO " . $this->table . " (nome, palestrante, data_evento, local, capacidade, descricao) VALUES (:nome, :palestrante, :data_evento, :local, :capacidade, :descricao)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':palestrante', $this->palestrante);
        $stmt->bindParam(':data_evento', $this->data_evento);
        $stmt->bindParam(':local', $this->local);
        $stmt->bindParam(':capacidade', $this->capacidade);
        $stmt->bindParam(':descricao', $this->descricao);

        return $stmt->execute();
    }

    public function editarEvento() {
        $query = "UPDATE " . $this->table . " SET nome = :nome, palestrante = :palestrante, data_evento = :data_evento, local = :local, capacidade = :capacidade, descricao = :descricao WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':palestrante', $this->palestrante);
        $stmt->bindParam(':data_evento', $this->data_evento);
        $stmt->bindParam(':local', $this->local);
        $stmt->bindParam(':capacidade', $this->capacidade);
        $stmt->bindParam(':descricao', $this->descricao);

        return $stmt->execute();
    }

    public function deletarEvento() {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    public function listarEventos() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY data_evento ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function buscarEventoPorId($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
//fim
?>