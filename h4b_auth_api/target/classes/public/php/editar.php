<?php 
include 'conexao.php'; // Conecta ao banco de dados
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar Jogador</title>
  <link rel="stylesheet" href="editar.css"> <!-- Link para o CSS externo -->
</head>
<body>
  <div class="login-container">
    <div class="login-form">
      <h2>Buscar Jogador por ID</h2>
      <!-- Formulário para buscar o jogador -->
      <form method="GET" action="editar.php">
        <div class="input-group">
          <label for="cd_jogador">ID do Jogador</label>
          <input type="number" name="cd_jogador" placeholder="Digite o ID do jogador" required>
        </div>
        <button type="submit" class="btn">Buscar</button>
      </form>

      <?php 
      if (isset($_GET['cd_jogador'])) { 
        $cd_jogador = $_GET['cd_jogador']; 

        // Usar prepared statement para evitar SQL Injection
        $sql = "SELECT * FROM jogadores WHERE cd_jogador = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $cd_jogador); // "i" para inteiro
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) { 
          $jogador = $resultado->fetch_assoc(); 
      ?>

      <!-- Formulário para editar os dados do jogador -->
      <h2>Editar Dados do Jogador</h2>
      <form method="POST" action="confirmar_edicao.php">
        <div class="input-group">
          <label for="nm_jogador">Nome do Jogador</label>
          <input type="text" name="nm_jogador" value="<?= $jogador['nm_jogador'] ?>" required>
        </div>
        <div class="input-group">
          <label for="nm_posicao">Posição</label>
          <input type="text" name="nm_posicao" value="<?= $jogador['nm_posicao'] ?>" required>
        </div>
        <input type="hidden" name="cd_jogador" value="<?= $jogador['cd_jogador'] ?>"> <!-- ID oculto para edição -->
        <button type="submit" class="btn">Salvar Alterações</button>
      </form>

      <!-- Formulário para excluir o jogador -->
      <form method="POST" action="confirmar_exclusao.php" style="display:inline;">
        <input type="hidden" name="cd_jogador" value="<?= $jogador['cd_jogador'] ?>"> 
        <button type="submit" class="btn" onclick="return confirm('Tem certeza que deseja excluir este jogador?');">Excluir Jogador</button>
      </form>

      <!-- Botão para voltar à página de cadastro de outro jogador -->
      <a href="cadastroJG.php">
        <button type="button" class="btn">Adicionar Outro Jogador</button>
      </a>

      <?php 
        } else { 
          echo "<p>Jogador não encontrado.</p>"; 
        } 
      } 
      ?>
    </div>
  </div>
</body>
</html>
