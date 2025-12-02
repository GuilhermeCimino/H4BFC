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
        // ... (Lógica de pagamento PIX e BOLETO permanece inalterada)
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
        // ... (Lógica de escolha de Setor permanece inalterada)
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
        // ... (Lógica de escolha de Assento permanece inalterada)
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

    // =================================================================
    // CORREÇÃO DOS BLOCOS DE RESPOSTAS NORMAIS (Evitar aninhamento)
    // =================================================================

    // RESPOSTAS NORMAIS: Olá
    if (msg.includes("oi") || msg.includes("ola")) {
        return ["Olá! Como posso ajudar você?"];
    }

    // RESPOSTAS NORMAIS: Jogos / Ingressos
    if (msg.includes("jogos") || msg.includes("partidas") || msg.includes("ingresso")) {
        return [
            "Temos apenas H4B x Flamengo disponível para compra!",
            "Os próximos jogos são: H4B vs Grêmio, São Paulo e Atlético-MG."
        ];
    }

    // RESPOSTAS NORMAIS: Flamengo (Início da compra)
    if (msg.includes("flamengo")) {
        return [
            "Ótima escolha! O jogo custa R$55 por ingresso.",
            "Quantos ingressos você deseja?"
        ];
    }

    // RESPOSTAS NORMAIS: Jogos Indisponíveis
    if (msg.includes("gremio") || msg.includes("são paulo") || msg.includes("sao paulo") || msg.includes("atletico")) {
        return ["Venda indisponível por enquanto..."];
    }

    // RESPOSTAS NORMAIS: Stadium
    if (msg.includes("stadium") || msg.includes("estadio") || msg.includes("estádio")) {
        return ["No ano de 2023 marcou o início de uma era, com a construção do nosso primeiro estádio Abdallah Habib Stadium, a paixão da torcida pulsando nas lindas arquibancadas. Uma jornada de glórias e superações."];
    }

    // RESPOSTAS NORMAIS: Mascote
    if (msg.includes("mascote") || msg.includes("amazonio") || msg.includes("amazônio") || msg.includes("apresente") || msg.includes("voce") || msg.includes("você")) {
        return ["Eu sou o Amazônio, o mascote mais carismático e forte das águas! Sou um lendário boto-cor-de-rosa da Amazônia. Com um físico musculoso e uma expressão sempre confiante e amigável, eu visto as cores da vitória: preto e rosa vibrante. Sou um símbolo de astúcia, rapidez, e a alegria contagiante do esporte brasileiro. Ah, e não se engane com meu sorriso contagiante, também adoro uma boa travessura😈."];
    }

    // RESPOSTAS NORMAIS: Títulos
    if (msg.includes("titulo") || msg.includes("título")) {
        return ["Com 5 Copas Libertadores e 5 Taças do Mundo, o H4B F.C. é uma lenda global. Soma-se a isso o domínio nacional, com 15 Brasileiros e um total de 30 títulos estaduais e 15 interestaduais, confirmando sua posição como o time mais vitorioso do Brasil."];
    }

    // RESPOSTAS NORMAIS: Comissão Técnica
    if (msg.includes("comissao") || msg.includes("tecnica") || msg.includes("comissão") || msg.includes("técnica")) {
        return ["A base das vitórias do H4B F.C. está na sua Comissão Técnica de ponta, liderada pela energia e visão estratégica de Fabricio Bruto (Técnico). Ele é o arquiteto tático por trás dos títulos. O suporte crucial vem de Raquel Dos Anjos (Auxiliar Técnica), que garante a alta motivação e a coesão do elenco com sua excelente comunicação, e Isabella Jacques (Auxiliar Técnica), a especialista em análise de desempenho que oferece a vantagem tática vital. Juntos, este trio de elite assegura que o H4B F.C. mantenha sua hegemonia no futebol mundial."];
        // O return a seguir estava incorretamente posicionado. Mantenha ele se for uma resposta adicional.
        return ["No ano de 2023 marcou o início de uma era, com a construção do nosso primeiro estádio Abdallah Habib Stadium!"];
    }

    // RESPOSTAS NORMAIS: Elenco e Jogadores
    if (msg.includes("elenco") || msg.includes("jogadores")) {
        return ["O Elenco Galáctico é a materialização da excelência. O ataque é um pesadelo: a letalidade de Cristiano Ronaldo, Lewandowski e a genialidade de nosso ídolo Abdallah Habib se juntam à explosão de Mbappé, Haaland., garantindo o poder de fogo em qualquer momento. O coração da equipe pulsa no meio-campo, onde a visão cirúrgica de Luka Modrić e a magia do nosso capitão Guilherme Cimino formam um motor insuperável, com a versatilidade de Andreas Pereira e Giorgian De Arrascaeta assegurando o domínio tático. A retaguarda é uma fortaleza, com a liderança intransigente de Sergio Ramos e a capacidade de antecipação de Natan Correa, protegida pela experiência segura dos irmãos goleiros Marcos e Markus. Este esquadrão veste a glória, o time que não joga para vencer, mas sim para consagrar a sua dinastia."];
        // Os blocos seguintes estavam aninhados incorretamente e foram separados.
    }
    
    // RESPOSTAS NORMAIS: Ídolo (Movido para fora do bloco 'elenco' para ser acessível)
    if (msg.includes("idolo") || msg.includes("ídolo") || msg.includes("abdallah") || msg.includes("habib")) {
        return ["Abdallah Habib é a alma imortal e o maior ídolo da história do H4B F.C. Presente desde as raízes do clube, ele não apenas brilhou por sua técnica, mas forjou o espírito vencedor do time. Como capitão e líder moral, ele é a personificação da paixão e do comprometimento inabalável que guiou o H4B F.C. à glória mundial. Em homenagem à sua trajetória, o nosso estádio leva o seu nome, um templo de glórias batizado em honra ao eterno ícone, nosso rei."];
    }

    // DETECTA NÚMERO (QUANTIDADE) - Início da Transação
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