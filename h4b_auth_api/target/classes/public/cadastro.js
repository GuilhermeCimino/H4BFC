document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const statusMessage = document.getElementById('statusMessage');
    const passwordInput = document.getElementById('h4b-password');
    const confirmPasswordInput = document.getElementById('h4b-confirm-password');

    form.addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário (o que faria a página recarregar)
        event.preventDefault(); 

        // 1. Limpa mensagens anteriores
        statusMessage.style.display = 'none';
        statusMessage.classList.remove('success', 'error');

        // 2. Validação da senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            // Se as senhas não coincidirem
            statusMessage.textContent = 'Erro: As senhas digitadas não coincidem.';
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
            return; // Interrompe o processo
        }
        
        // 3. Simulação de Cadastro BEM-SUCEDIDO
        
        // Esconde o formulário
        form.style.display = 'none';
        
        // Exibe a mensagem de sucesso
        statusMessage.textContent = '✅ Cadastro Finalizado! O novo funcionário já pode fazer o Login ADM.';
        statusMessage.classList.add('success');
        statusMessage.style.display = 'block';

        // 4. Se fosse um sistema real, você enviaria os dados
        // Para um servidor aqui (usando fetch() ou XMLHttpRequest)
    });
});