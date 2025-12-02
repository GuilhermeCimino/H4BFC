document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // evita enviar o formulário

    const codigoDigitado = document.getElementById("h4b-codigo").value.trim();
    const codigoCorreto = "H4B2024"; // código que você quiser

    if (codigoDigitado === codigoCorreto) {
        // Redireciona para a página de criar conta
        window.location.href = "criarConta.html";
    } else {
        alert("Código incorreto! Tente novamente.");
    }
});
