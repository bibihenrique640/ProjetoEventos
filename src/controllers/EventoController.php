<?php
//EventoController.php

// src/controllers/EventoController.php

require_once _DIR_ . '/../models/Evento.php';

class EventoController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function criarEvento($nome, $palestrante, $data_evento, $local, $capacidade, $descricao) {
        $evento = new Evento($this->conn);
        $evento->nome = $nome;
        $evento->palestrante = $palestrante;
        $evento->data_evento = $data_evento;
        $evento->local = $local;
        $evento->capacidade = $capacidade;
        $evento->descricao = $descricao;

        return $evento->criarEvento();
    }

    public function editarEvento($id, $nome, $palestrante, $data_evento, $local, $capacidade, $descricao) {
        $evento = new Evento($this->conn);
        $evento->id = $id;
        $evento->nome = $nome;
        $evento->palestrante = $palestrante;
        $evento->data_evento = $data_evento;
        $evento->local = $local;
        $evento->capacidade = $capacidade;
        $evento->descricao = $descricao;

        return $evento->editarEvento();
    }

    public function deletarEvento($id) {
        $evento = new Evento($this->conn);
        $evento->id = $id;

        return $evento->deletarEvento();
    }

    public function listarEventos() {
        $evento = new Evento($this->conn);
        return $evento->listarEventos();
    }

    public function buscarEventoPorId($id) {
        $evento = new Evento($this->conn);
        return $evento->buscarEventoPorId($id);
    }
}
//fim
?>