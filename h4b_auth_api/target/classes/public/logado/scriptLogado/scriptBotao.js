const usuarioBtn = document.getElementById('usuarioBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

usuarioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
});



// logout
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    // Remove dados do usuário
    localStorage.removeItem('token'); // ou o nome que você usa para o token
    localStorage.removeItem('usuario'); // se você guardou dados do usuário

    // Redireciona para login
    window.location.href = '../login.html';
});

