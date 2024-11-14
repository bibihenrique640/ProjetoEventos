<?php
require '../../config/db_connect.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $stmt = $pdo->prepare("INSERT INTO eventos (nome, palestrante, data_evento, local, capacidade, vagas_disponiveis) 
                           VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->nome, $data->palestrante, $data->data_evento, $data->local, $data->capacidade, $data->capacidade]);
    
    echo json_encode(["message" => "Evento criado com sucesso!"]);
} else {
    echo json_encode(["message" => "Dados inválidos"]);
}
?>
