let aguardandoPagamento = false;  // controla se estamos esperando forma de pagamento
let valorTotal = 0;               // guarda valor final após cálculo


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


function addMessage(from, text) {
    let chat = document.getElementById("chat");
    chat.innerHTML += `<p><b>${from}:</b> ${text}</p>`;
    chat.scrollTop = chat.scrollHeight;
}


// Função para gerar PIX e BOLETO

function gerarPix() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 32; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
}

function gerarBoleto() {
    let codigo = "";
    for (let i = 0; i < 44; i++) {
        codigo += Math.floor(Math.random() * 10); // apenas números
    }
    return codigo;
}


// Função principal de respostas

function gerarResposta(msg) {

    // Se estamos esperando forma de pagamento → processa aqui
    if (aguardandoPagamento) {

        if (msg.includes("pix")) {
            aguardandoPagamento = false;

            return [
                "Você escolheu PIX!",
                "Gerando código...",
                `Código PIX:`,
                gerarPix()
            ];
        }

        if (msg.includes("boleto")) {
            aguardandoPagamento = false;

            return [
                "Você escolheu boleto!",
                "Gerando boleto...",
                `Boleto:`,
                gerarBoleto()
            ];
        }

        return ["Escolha inválida. Digite: PIX ou BOLETO."];
    }


    // Respostas básicas
    if (msg.includes("oi") || msg.includes("ola")) {
        return ["Olá! Como posso ajudar você a comprar ingressos?"];
    }

    if (msg.includes("jogos") || msg.includes("partidas") || msg.includes("ingresso")) {
        return [
            "Temos apenas H4B x Flamengo disponível para compra!",
            "Nossos próximos compromissos para este mês são: H4B vs Grêmio, H4B vs São Paulo e H4B vs Atlético-MG."
        ];
    }

    if (msg.includes("flamengo")) {
        return [
            "Ótima escolha! O jogo H4B x Flamengo custa R$55 por ingresso.",
            "Quantos ingressos você quer?"
        ];
    }

    if (msg.includes("gremio")) return ["Venda de ingressos indisponível por enquanto..."];
    if (msg.includes("sao paulo") || msg.includes("são paulo")) return ["Venda de ingressos indisponível por enquanto..."];
    if (msg.includes("atletico")) return ["Venda de ingressos indisponível por enquanto..."];


    // Detecta quantidade e calcula preço
   
    let numero = msg.match(/\d+/);

    if (numero) {
        let qtd = parseInt(numero[0]);
        let preco = 55;
        valorTotal = qtd * preco;    // salva valor

        aguardandoPagamento = true;  // espera forma de pagamento

        return [
            `Você escolheu ${qtd} ingresso(s).`,
            `O valor total fica: R$${valorTotal}.`,
            "Qual forma de pagamento você deseja? (PIX ou BOLETO)"
        ];
    }


    return ["Desculpe, não entendi. Pode tentar de outro jeito?"];
}



// tecla Enter envia
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") enviar();
});
