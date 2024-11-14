<?php
require '../../config/db_connect.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->id)) {
    $stmt = $pdo->prepare("UPDATE eventos SET nome=?, palestrante=?, data_evento=?, local=?, capacidade=?, vagas_disponiveis=? WHERE id=?");
    $stmt->execute([$data->nome, $data->palestrante, $data->data_evento, $data->local, $data->capacidade, $data->capacidade, $data->id]);
    echo json_encode(["message" => "Evento atualizado com sucesso!"]);
} else {
    echo json_encode(["message" => "Dados inválidos"]);
}
?>
