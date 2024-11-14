<?php
require '../../config/db_connect.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->cpf) && isset($data->evento_id)) {
    // Verificar se o CPF já está registrado para este evento
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM presencas WHERE cpf_participante = ? AND evento_id = ?");
    $stmt->execute([$data->cpf, $data->evento_id]);
    $existe = $stmt->fetchColumn();

    if ($existe > 0) {
        // Retornar mensagem de erro se o CPF já está registrado
        echo json_encode(["message" => "Erro: Este participante já está inscrito neste evento."]);
        http_response_code(400); // Define o código de status como 400 (erro)
    } else {
        // Inserir nova presença se o CPF não estiver registrado
        $stmt = $pdo->prepare("INSERT INTO presencas (nome_participante, cpf_participante, evento_id) VALUES (?, ?, ?)");
        $stmt->execute([$data->nome, $data->cpf, $data->evento_id]);
        
        echo json_encode(["message" => "Inscrição confirmada com sucesso!"]);
    }
} else {
    echo json_encode(["message" => "Dados inválidos"]);
    http_response_code(400); // Código de status de erro
}
?>
