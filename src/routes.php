<?php
//routes.php

// src/routes.php

require_once _DIR_ . '/config/database.php';
require_once 'controllers/UsuarioController.php';
require_once 'controllers/EventoController.php';
require_once 'controllers/PresencaController.php';

$db = (new Database())->getConnection();
$usuarioController = new UsuarioController($db);
$eventoController = new EventoController($db);
$presencaController = new PresencaController($db);

$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Definir rotas
switch ($path) {
    case '/usuario/registrar':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($usuarioController->registrar($data['nome'], $data['email'], $data['senha'], $data['tipo'] ?? 'usuario'));
        }
        break;

    case '/usuario/autenticar':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($usuarioController->autenticar($data['email'], $data['senha']));
        }
        break;

    case '/evento/criar':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($eventoController->criarEvento($data['nome'], $data['palestrante'], $data['data_evento'], $data['local'], $data['capacidade'], $data['descricao']));
        }
        break;

    case '/evento/editar':
        if ($requestMethod === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($eventoController->editarEvento($data['id'], $data['nome'], $data['palestrante'], $data['data_evento'], $data['local'], $data['capacidade'], $data['descricao']));
        }
        break;

    case '/evento/deletar':
        if ($requestMethod === 'DELETE') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($eventoController->deletarEvento($data['id']));
        }
        break;

    case '/evento/listar':
        if ($requestMethod === 'GET') {
            echo json_encode($eventoController->listarEventos());
        }
        break;

    case '/presenca/confirmar':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($presencaController->confirmarPresenca($data['usuario_id'], $data['evento_id']));
        }
        break;

    case '/presenca/listar':
        if ($requestMethod === 'GET' && isset($_GET['evento_id'])) {
            echo json_encode($presencaController->listarParticipantes($_GET['evento_id']));
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['message' => 'Endpoint não encontrado']);
        break;
}
//fim
?>