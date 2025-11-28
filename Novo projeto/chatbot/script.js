let aguardandoPagamento = false;
let valorTotal = 0;
let idCompra = "";

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

function addMessage(from, text) {
    let chat = document.getElementById("chat");
    chat.innerHTML += `<p><b>${from}:</b> ${text}</p>`;
    chat.scrollTop = chat.scrollHeight;
}


// Gerar ID da Compra

function gerarID() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 12; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}


// Gerar código PIX

function gerarPix() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 32; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
}


// Gerar boleto formatado

function gerarBoletoFormatado() {
    let nums = "";
    for (let i = 0; i < 44; i++) {
        nums += Math.floor(Math.random() * 10);
    }

    // Formato real de boleto: 5-5-5 / 6-5-6 / 5-6-5 / 1 / 11
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



// Lógica do chatbot

function gerarResposta(msg) {

    // Se estamos aguardando forma de pagamento
    if (aguardandoPagamento) {

        if (msg.includes("pix")) {

            aguardandoPagamento = false;
            let codigoPix = gerarPix();

            return [
                "Você escolheu PIX!",
                `ID do pedido: ${idCompra}`,
                "Gerando código PIX...",
                `Código PIX:`,
                codigoPix,
            ];
        }

        if (msg.includes("boleto")) {

            aguardandoPagamento = false;
            let boleto = gerarBoletoFormatado();

            return [
                "Você escolheu boleto!",
                `ID do pedido: ${idCompra}`,
                "Gerando Boleto...",
                `Boleto:`,
                boleto
            ];
        }

        return ["Escolha inválida. Digite PIX ou BOLETO."];
    }


    // Respostas básicas
    if (msg.includes("oi") || msg.includes("ola")) {
        return ["Olá! Como posso ajudar você a comprar ingressos?"];
    }

    if (msg.includes("jogos") || msg.includes("partidas") || msg.includes("ingresso")) {
        return [
            "Temos apenas H4B x Flamengo disponível para compra!",
            "Nossos próximos compromissos são: H4B vs Grêmio, H4B vs São Paulo e H4B vs Atlético-MG."
        ];
    }

    if (msg.includes("flamengo")) {
        return [
            "Ótima escolha! O jogo H4B x Flamengo custa R$55 por ingresso.",
            "Quantos ingressos você quer?"
        ];
    }

    if (msg.includes("gremio")) return ["Venda indisponível por enquanto..."];
    if (msg.includes("sao paulo") || msg.includes("são paulo")) return ["Venda indisponível por enquanto..."];
    if (msg.includes("atletico")) return ["Venda indisponível por enquanto..."];


    // Detecta quantidade + calcula preço

    let numero = msg.match(/\d+/);

    if (numero) {
        let qtd = parseInt(numero[0]);
        let preco = 55;
        valorTotal = qtd * preco;

        idCompra = gerarID(); // cria ID único

        aguardandoPagamento = true;

        return [
            `Você escolheu ${qtd} ingresso(s).`,
            `Total: R$${valorTotal}.`,
            "Como deseja pagar? (PIX ou BOLETO)"
        ];
    }


    return ["Desculpe, não entendi. Pode tentar de outro jeito?"];
}


// ENTER para enviar
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") enviar();
});
