<?php
include 'conexao.php'; // Arquivo que conecta com o banco de dados via PDO

// Verifica se os dados do formulário foram enviados
if (isset($_POST['cd_jogador'], $_POST['nm_jogador'], $_POST['nm_posicao'])) {
    // Obtém os dados do formulário
    $cd_jogador = $_POST['cd_jogador'];
    $nm_jogador = $_POST['nm_jogador'];
    $nm_posicao = $_POST['nm_posicao'];

    // Preparar a consulta de atualização com PDO
    $sql = "UPDATE jogadores SET nm_jogador = ?, nm_posicao = ? WHERE cd_jogador = ?";
    $stmt = $conn->prepare($sql);

    // Executar a consulta de atualização
    try {
        $stmt->execute([$nm_jogador, $nm_posicao, $cd_jogador]);
        echo "<p>Jogador atualizado com sucesso!</p>";
    } catch (PDOException $e) {
        echo "<p>Erro ao atualizar jogador: " . $e->getMessage() . "</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar Jogador</title>
  <link rel="stylesheet" href="confirmar.css"> <!-- Link para o CSS -->
</head>
<body>
  
</body>
</html>
