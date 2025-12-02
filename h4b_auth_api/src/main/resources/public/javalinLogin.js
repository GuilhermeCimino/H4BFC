document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (!form) {
    console.error("Formulário loginForm não encontrado!");
    return; // evita erro se o elemento não existir
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('h4b-email').value;
    const password = document.getElementById('h4b-password').value;

    try {
      const response = await fetch('http://localhost:7070/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password })
      });

      // Aqui mostra o status HTTP
      console.log("Status HTTP:", response.status);

      const data = await response.json(); // lê o corpo **uma única vez**

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Login realizado com sucesso!');
          window.location.href = 'logado/indexLogado.html';
        } else {
          alert('Token não recebido do servidor.');
        }
      } else {
        alert(`Erro no login: ${data.error || data}`);
      }

    } catch (error) {
      console.error('Erro na comunicação com servidor:', error);
      alert('Erro na comunicação com o servidor.');
    }
  });
});
