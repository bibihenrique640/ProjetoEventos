<?php
//PresencaController.php

// src/controllers/PresencaController.php

require_once _DIR_ . '/../models/Presenca.php';

class PresencaController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function confirmarPresenca($usuario_id, $evento_id) {
        $presenca = new Presenca($this->conn);
        $presenca->usuario_id = $usuario_id;
        $presenca->evento_id = $evento_id;

        // Verificar se já existe presença confirmada para evitar duplicidade
        if (!$presenca->verificarPresenca($usuario_id, $evento_id)) {
            return $presenca->confirmarPresenca();
        } else {
            return false; // Já confirmado
        }
    }

    public function listarParticipantes($evento_id) {
        $presenca = new Presenca($this->conn);
        return $presenca->listarParticipantesPorEvento($evento_id);
    }
}
//fim
?>