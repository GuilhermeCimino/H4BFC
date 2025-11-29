<?php
include 'conexao.php'; // Arquivo que conecta com o banco de dados

// Verifica se os dados foram enviados via POST
if (isset($_POST['nm_jogador'], $_POST['cd_jogador'], $_POST['nm_posicao'])) {
    // Pega os dados do formulário
    $nm_jogador = $_POST['nm_jogador'];
    $cd_jogador = $_POST['cd_jogador'];
    $nm_posicao = $_POST['nm_posicao'];

    // Prepara a query SQL utilizando prepared statements
    $sql = "INSERT INTO jogadores (nm_jogador, nm_posicao, cd_jogador) VALUES (?, ?, ?)";

    // Prepara a declaração
    if ($stmt = $conn->prepare($sql)) {
        // Vincula os parâmetros (s = string, i = inteiro)
        $stmt->bind_param("ssi", $nm_jogador, $nm_posicao, $cd_jogador);

        // Executa a query
        if ($stmt->execute()) {
            echo "<p></p>";
        } else {
            echo "<p>Erro: " . $stmt->error . "</p>";
        }

        // Fecha a declaração
        $stmt->close();
    } else {
        echo "<p>Erro ao preparar a consulta: " . $conn->error . "</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Jogador</title>
    <link rel="stylesheet" href="cadastro.css"> <!-- Link para o arquivo CSS externo -->
</head>
<body>
    <div class="form-container">
        <h2>Cadastro de Jogador</h2>

        <!-- Formulário de cadastro -->
        <form action="" method="POST">
            <div class="input-group">
                <label for="cd_jogador">CD do Jogador</label>
                <input type="number" name="cd_jogador" id="cd_jogador" placeholder="CD do Jogador" required>
            </div>

            <div class="input-group">
                <label for="nm_jogador">Nome do Jogador</label>
                <input type="text" name="nm_jogador" id="nm_jogador" placeholder="Nome do Jogador" required>
            </div>

            <div class="input-group">
                <label for="nm_posicao">Posição do Jogador</label>
                <input type="text" name="nm_posicao" id="nm_posicao" placeholder="Posição do Jogador" required>
            </div>

            <button type="submit" class="btn">Cadastrar Jogador</button>
        </form>

        <div class="actions">
            <a href="editar.php">
                <button type="button" class="btn">Editar Jogador</button>
            </a>
        </div>
    </div>
</body>
</html>

