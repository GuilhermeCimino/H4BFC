let aguardandoPagamento = false;
let valorTotal = 0;
let idCompra = "";

// NOVAS VARIÁVEIS
let escolhendoSetor = false;
let escolhendoAssento = false;
let setorEscolhido = "";
let assentoEscolhido = "";

// Função para animar entrada das mensagens
function addMessage(from, text) {
    let chat = document.getElementById("chat");

    let p = document.createElement("p");
    p.className = from === "Amazônio" ? "msg bot-msg" : "msg user-msg";

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

    requestAnimationFrame(() => {
        chat.scrollTop = chat.scrollHeight;
    });
}

function enviar() {
    let msg = document.getElementById("msg").value.toLowerCase();
    document.getElementById("msg").value = "";

    addMessage("Você", msg);

    let respostas = gerarResposta(msg);

    respostas.forEach((resposta, i) => {
        setTimeout(() => {
            addMessage("Amazônio", resposta);
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

    // AGUARDANDO PAGAMENTO
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

    // ESCOLHA DO SETOR
    if (escolhendoSetor) {

        if (msg.includes("norte") || msg.includes("sul") || msg.includes("leste") || msg.includes("oeste")) {

            if (msg.includes("norte")) setorEscolhido = "Arquibancada Norte";
            if (msg.includes("sul")) setorEscolhido = "Arquibancada Sul";
            if (msg.includes("leste")) setorEscolhido = "Leste (Área VIP / Sócios)";
            if (msg.includes("oeste")) setorEscolhido = "Oeste";

            escolhendoSetor = false;
            escolhendoAssento = true;

            return [
                `Setor selecionado: ${setorEscolhido}.`,
                "Agora escolha o assento (ex: A1, A2, V1, V2, C3, B2...)."
            ];
        }

        return ["Escolha um setor válido: Norte, Sul, Leste (VIP) ou Oeste."];
    }

    // ESCOLHA DO ASSENTO
    if (escolhendoAssento) {

        let assento = msg.toUpperCase().match(/[A-Z]\d+/);

        if (assento) {
            assentoEscolhido = assento[0];
            escolhendoAssento = false;
            aguardandoPagamento = true;

            return [
                `Assento escolhido: ${assentoEscolhido}.`,
                "Assento reservado! Agora escolha o pagamento: PIX ou BOLETO."
            ];
        }

        return ["Assento inválido. Digite um no formato A1, B3, C4, V2..."];
    }

    // RESPOSTAS NORMAIS
    if (msg.includes("oi") || msg.includes("ola")) {
        return ["Olá! Como posso ajudar você?"];
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

    if (msg.includes("stadium") || msg.includes("estadio") || msg.includes("estádio")) {
        return ["No ano de 2023 marcou o início de uma era, com a construção do nosso primeiro estádio Abdallah Habib Stadium!"];
    }

    if (msg.includes("amazonio") || msg.includes("amazônio") || msg.includes("mascote")) {
        return ["Eu sou o Amazônio, o boto-cor-de-rosa mais forte do Brasil!"];
    }

    // DETECTA NÚMERO (QUANTIDADE)
    let numero = msg.match(/\d+/);

    if (numero) {
        let qtd = parseInt(numero[0]);
        let preco = 55;
        valorTotal = qtd * preco;

        idCompra = gerarID();

        escolhendoSetor = true;

        return [
            `Você escolheu ${qtd} ingresso(s).`,
            `Total da compra: R$${valorTotal}.`,
            "Agora escolha o setor: Norte, Sul, Leste (VIP) ou Oeste."
        ];
    }

    // PADRÃO
    return ["Desculpe, não entendi. Pode tentar de outro jeito?"];
}

// Enviar com ENTER
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") enviar();
});
