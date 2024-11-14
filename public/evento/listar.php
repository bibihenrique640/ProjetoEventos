<?php
require '../../config/db_connect.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT id, nome, palestrante, data_evento, local, capacidade, vagas_disponiveis FROM eventos");
$eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($eventos);
?>
