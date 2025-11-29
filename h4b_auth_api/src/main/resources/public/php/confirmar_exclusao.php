<?php
include 'conexao.php'; // Conexão com o banco

if (isset($_POST['cd_jogador'])) {
    $cd_jogador = $_POST['cd_jogador'];

    // Preparar a consulta de exclusão
    $sql = "DELETE FROM jogadores WHERE cd_jogador = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $cd_jogador); // "i" para inteiro

    if ($stmt->execute()) {
        echo "Jogador excluído com sucesso!";
        // Você pode redirecionar para outra página após a exclusão
        // header('Location: pagina_sucesso.php');
    } else {
        echo "Erro ao excluir jogador: " . $stmt->error;
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>confirmar</title>
  <link rel="stylesheet" href="confirmar.css"> <!-- Link para o CSS -->
</head>
<body>
  
</body>
</html>