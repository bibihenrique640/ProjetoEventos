<?php
// src/controllers/UsuarioController.php

require_once '../models/Usuario.php';

class UsuarioController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function registrar($nome, $email, $senha, $tipo = 'usuario') {
        $usuario = new Usuario($this->conn);
        $usuario->nome = $nome;
        $usuario->email = $email;
        $usuario->senha = $senha;
        $usuario->tipo = $tipo;

        return $usuario->criarUsuario();
    }

    public function autenticar($email, $senha) {
        $usuario = new Usuario($this->conn);
        if ($usuario->autenticarUsuario($email, $senha)) {
            return [
                'id' => $usuario->id,
                'nome' => $usuario->nome,
                'email' => $usuario->email,
                'tipo' => $usuario->tipo
            ];
        }
        return null;
    }
}
?>
