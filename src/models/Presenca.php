<?php
//Presenca.php

// src/models/Presenca.php

class Presenca {
    private $conn;
    private $table = 'presencas';

    public $id;
    public $usuario_id;
    public $evento_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function confirmarPresenca() {
        $query = "INSERT INTO " . $this->table . " (usuario_id, evento_id) VALUES (:usuario_id, :evento_id)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':usuario_id', $this->usuario_id);
        $stmt->bindParam(':evento_id', $this->evento_id);

        return $stmt->execute();
    }

    public function listarParticipantesPorEvento($evento_id) {
        $query = "SELECT u.id, u.nome, u.email 
                  FROM " . $this->table . " p 
                  JOIN usuarios u ON p.usuario_id = u.id 
                  WHERE p.evento_id = :evento_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':evento_id', $evento_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function verificarPresenca($usuario_id, $evento_id) {
        $query = "SELECT * FROM " . $this->table . " WHERE usuario_id = :usuario_id AND evento_id = :evento_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':evento_id', $evento_id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) ? true : false;
    }
}
//fim
?>