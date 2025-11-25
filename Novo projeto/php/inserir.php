<?php
include 'conexao.php'; // Arquivo que conecta com o banco

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
            echo "Jogador cadastrado com sucesso!";
        } else {
            echo "Erro: " . $stmt->error;
        }

        // Fecha a declaração
        $stmt->close();
    } else {
        echo "Erro ao preparar a consulta: " . $conn->error;
    }
} else {
    echo "Por favor, preencha todos os campos.";
}
?>

<!-- Botão para voltar à página de cadastro e adicionar outro jogador -->
<a href="cadastroJG.php">
    <button type="button">Adicionar Outro Jogador</button>
</a>

<a href="editar.php">
    <button type="button">Editar Jogador</button>
</a>

