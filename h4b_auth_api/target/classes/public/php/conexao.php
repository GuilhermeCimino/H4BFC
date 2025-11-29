<?php
// Dados de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "h4bfc";
 
// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);
 
// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

?>