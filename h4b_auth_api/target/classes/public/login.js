document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    // Log para testar se o evento de submit está sendo chamado
    console.log('Formulário enviado');

    // Obtém os valores dos campos
    const email = document.getElementById('h4b-email').value;
    const password = document.getElementById('h4b-password').value;

    // Credenciais de login
    const validEmail = 'admin.docs@gmail.com';
    const validPassword = 'batatafrita72';

    // Verifica se as credenciais estão corretas
    if (email === validEmail && password === validPassword) {
        // Redireciona para a página indexLogado.html dentro da pasta 'logado'
        console.log('Credenciais corretas, redirecionando...');
        window.location.href = 'http://127.0.0.1:5500/h4b_auth_api/src/main/resources/public/logado/indexLogado.html';
    } else {
        // Exibe uma mensagem de erro caso as credenciais estejam erradas
        alert('E-mail ou senha incorretos!');
    }
});
