// cadastro.js - Versão com proteção por token

console.log('🔧 cadastro.js carregado (versão com token)');

// A proteção principal já está no HTML
// Este arquivo pode conter funções auxiliares se necessário

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarMensagem(texto, tipo = 'sucesso') {
    const div = document.getElementById('statusMessage');
    if (div) {
        div.textContent = texto;
        div.style.display = 'block';
        
        if (tipo === 'sucesso') {
            div.style.backgroundColor = '#d4edda';
            div.style.color = '#155724';
        } else {
            div.style.backgroundColor = '#f8d7da';
            div.style.color = '#721c24';
        }
        
        // Esconde após 5 segundos
        setTimeout(() => {
            div.style.display = 'none';
        }, 5000);
    }
}

// Função para verificar token (pode ser usada por outras páginas)
function verificarAutenticacao() {
    const token = localStorage.getItem('h4bfc_token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}