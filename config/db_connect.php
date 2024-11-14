<?php
// config/db_connect.php
$host = 'localhost';     // ou o endereço do seu servidor
$db = 'sistema_eventos';  // nome do banco de dados que criamos
$user = 'root';        // usuário do banco de dados
$pass = '';          // senha do banco de dados

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
