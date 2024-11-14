<?php
require '../../config/db_connect.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if ($id) {
    $stmt = $pdo->prepare("DELETE FROM eventos WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["message" => "Evento excluído com sucesso!"]);
} else {
    echo json_encode(["message" => "ID do evento não fornecido"]);
}
?>
