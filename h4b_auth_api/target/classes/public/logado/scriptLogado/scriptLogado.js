document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token"); // pega o token salvo

    if (!token) { // se não tiver token
        alert("Você não está logado!");
        window.location.href = "../login.html"; // volta pro login
        return;
    }

    try {
        const resp = await fetch("http://localhost:7070/perfil", {
            headers: { "Authorization": token } // envia token pro backend
        });

        if (!resp.ok) { // se o token for inválido ou expirou
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "../login.html";
            return;
        }

        const user = await resp.json(); 
        const nomeSemEmail = user.username.split("@")[0]; 
        document.getElementById("nomeUsuario").innerText = nomeSemEmail; // mostra nome na navbar

    } catch (err) { // se o backend estiver offline
        console.error("Erro ao conectar com o servidor:", err);
        alert("Não foi possível conectar ao servidor. Tente mais tarde.");
        window.location.href = "../login.html";
    }
});
