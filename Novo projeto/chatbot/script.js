let aguardandoPagamento = false;
let valorTotal = 0;
let idCompra = "";

// Função para animar entrada das mensagens
function addMessage(from, text) {
    let chat = document.getElementById("chat");

    // Cria elemento
    let p = document.createElement("p");
    p.className = from === "Chatbot" ? "msg bot-msg" : "msg user-msg";

    // Efeito de digitação
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            p.innerHTML = `<b>${from}:</b> ` + text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 15); 
        } else {
            p.innerHTML = `<b>${from}:</b> ${text}`;
        }
    }

    chat.appendChild(p);
    typeWriter();

    // Scroll automático
    chat.scrollTop = chat.scrollHeight;
}

function enviar() {
    let msg = document.getElementById("msg").value.toLowerCase();
    document.getElementById("msg").value = "";

    addMessage("Você", msg);

    let respostas = gerarResposta(msg);

    respostas.forEach((resposta, i) => {
        setTimeout(() => {
            addMessage("Chatbot", resposta);
        }, i * 900);
    });
}


// ID da compra
function gerarID() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 12; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Código PIX
function gerarPix() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 32; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
}

// Boleto formatado
function gerarBoletoFormatado() {
    let nums = "";
    for (let i = 0; i < 44; i++) nums += Math.floor(Math.random() * 10);

    return (
        nums.slice(0, 5) + "." +
        nums.slice(5, 10) + " " +
        nums.slice(10, 15) + "." +
        nums.slice(15, 21) + " " +
        nums.slice(21, 26) + "." +
        nums.slice(26, 32) + " " +
        nums.slice(32, 33) + " " +
        nums.slice(33)
    );
}


// Lógica principal
function gerarResposta(msg) {

    // Aguardando pagamento
    if (aguardandoPagamento) {

        if (msg.includes("pix")) {
            aguardandoPagamento = false;
            let codigoPix = gerarPix();

            return [
                "Você escolheu PIX!",
                `ID do pedido: ${idCompra}`,
                "Gerando código PIX...",
                "Código PIX:",
                codigoPix
            ];
        }

        if (msg.includes("boleto")) {
            aguardandoPagamento = false;
            let boleto = gerarBoletoFormatado();

            return [
                "Você escolheu boleto!",
                `ID do pedido: ${idCompra}`,
                "Gerando boleto...",
                "Linha digitável:",
                boleto
            ];
        }

        return ["Escolha inválida. Digite PIX ou BOLETO."];
    }

    // Respostas normais
    if (msg.includes("oi") || msg.includes("ola")) {
        return ["Olá! Como posso ajudar você a comprar ingressos?"];
    }

    if (msg.includes("jogos") || msg.includes("partidas") || msg.includes("ingresso")) {
        return [
            "Temos apenas H4B x Flamengo disponível para compra!",
            "Os próximos jogos são: H4B vs Grêmio, São Paulo e Atlético-MG."
        ];
    }

    if (msg.includes("flamengo")) {
        return [
            "Ótima escolha! O jogo custa R$55 por ingresso.",
            "Quantos ingressos você deseja?"
        ];
    }

    if (msg.includes("gremio") || msg.includes("são paulo") || msg.includes("sao paulo") || msg.includes("atletico")) {
        return ["Venda indisponível por enquanto..."];
    }

    // Detecta número
    let numero = msg.match(/\d+/);

    if (numero) {
        let qtd = parseInt(numero[0]);
        let preco = 55;
        valorTotal = qtd * preco;

        idCompra = gerarID();
        aguardandoPagamento = true;

        return [
            `Você escolheu ${qtd} ingresso(s).`,
            `Total da compra: R$${valorTotal}.`,
            "Como deseja pagar? (PIX ou BOLETO)"
        ];
    }

    // Padrão
    return ["Desculpe, não entendi. Pode tentar de outro jeito?"];
}


// Enviar com ENTER
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") enviar();
});
