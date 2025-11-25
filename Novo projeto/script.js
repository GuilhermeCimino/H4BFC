document.addEventListener('DOMContentLoaded', () => {
    const playerCards = document.querySelectorAll('.playerCard');

    playerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.number');
            if (number) {
                number.style.color = '#000000';
                number.style.transition = 'color 0.3s';
            }
        });

        card.addEventListener('mouseleave', () => {
            const number = card.querySelector('.number');
            if (number) {
                number.style.color = '#FF69B4'; 
            }
        });
    });


});


// Função para rolar o carrossel quando as setas são clicadas
function scrollCarousel(direction) {
    const track = document.getElementById('jersey-track');
    // Define a quantidade de rolagem (ex: 200 pixels)
    const scrollAmount = 250; 
    
    // Rola o carrossel na direção especificada
    track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth' // Rola suavemente
    });
}














// =============================
// botao para levar ao site de compra de ingressao
// =============================

// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões com a classe btnComprar1
  const botoes = document.querySelectorAll(".btnComprar");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      // Redireciona para a página desejada
      window.location.href = "localngresso.html";
    });
  });
});






    // =============================
    // 🧾 PARTE DE COMPRAR INGRESSO
    // =============================

    class Ingresso { // criando classe com preco e setor
        constructor(preco, setor) {
            this.preco = preco;
            this.setor = setor;
        }
        calcularSubtotal(qtd) { // metodo para calcular quantidade de ingressos pelo valor
            return this.preco * qtd;
        }
    }

    class IngressoVIP extends Ingresso {  // Aqui você está criando uma classe filha chamada IngressoVIP, que herda tudo da classe
        constructor(preco, setor, beneficios) {  //Esse é o construtor da classe IngressoVIP. Ele é chamado automaticamente quando você cria um novo ingresso VIP com new IngressoVIP(...).
            super(preco, setor);   // super(preco, setor) chama o construtor da classe Ingresso para reaproveitar o código.     
            this.beneficios = beneficios;  // this.beneficios guarda uma lista de benefícios VIP (array), como: ["Acesso Lounge", "Bebidas", "Cadeira Premium"]
        }
        mostrarBeneficios() {
            return `Benefícios VIP: ${this.beneficios.join(", ")}`;
        }  // Esse método pertence à classe IngressoVIP e serve para transformar o array de benefícios em uma frase legível para o usuário.
    }

    // Instanciação de objetos - Ingresso normal - modelo base da compra - um ingresso normal na arquibancada Norte custa 50 reais
    const ingressoNormal = new Ingresso(50, "Arquibancada Norte");

    //Instanciação de objetos - Ingresso Vip - modelo base da compra - um ingresso vip na leste Vip custa 150 reais além dos benefícios
    const ingressoVip = new IngressoVIP(150, "Leste (VIP)", ["Acesso Lounge", "Bebidas", "Cadeira Premium"]);

    //quantidade mínima de ingressos
    let quantidade = 1;
    //taxa ao utilizar ao sistema de comprar ingresso
    const taxaConveniencia = 5.00;

    //Pega o elemento que mostra a quantidade de ingressos na tela.
    const numeroSpan = document.querySelector(".numero");
    //Pegam os botões de "+" (aumentar) e "- (diminuir) a quantidade de ingressos.
    const btnMais = document.querySelector(".mais");
    const btnMenos = document.querySelector(".menos");
    //Pega o campo que mostra o preço do ingresso (VIP ou normal).
    const inputPreco = document.querySelector("#preco");
    //Pega o botão que o usuário clica para ver o total da compra.
    const btnVerTotal = document.querySelector("#verTotal");
    //Pegam os elementos que mostram:
    //Subtotal (preço × quantidade)
    //Taxa de conveniência
    //Total final
    const subtotalSpan = document.querySelector("#subtotal");
    const taxaSpan = document.querySelector("#taxa");
    const totalSpan = document.querySelector("#total");
    //Pega o elemento onde será exibida a mensagem com os benefícios VIP.
    const beneficiosEl = document.querySelector("#beneficiosVIP");
    //Pega o <select> onde o usuário escolhe o setor do estádio (Arquibancada ou VIP).
    const setorSelect = document.querySelector("#setor");

     // =============================
    //Função para calcular o total
     // =============================
    function atualizarTotal() {
        const precoIngresso = parseFloat(inputPreco.value) || 0; //Pega o preço do ingresso
        const subtotal = precoIngresso * quantidade; //Multiplica pela quantidade
        const total = subtotal + taxaConveniencia; //Soma a taxa de conveniência

        subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`; //Atualiza os valores na tela
        taxaSpan.textContent = `R$ ${taxaConveniencia.toFixed(2)}`; //Atualiza os valores na tela
        totalSpan.textContent = `R$ ${total.toFixed(2)}`; //Atualiza os valores na tela
    }

     // =============================
     // + - Botões de quantidade
     // =============================
    //Quando o usuário clica no botão "+", aumenta a quantidade 
    // de ingressos e atualiza na tela.
    btnMais.addEventListener("click", () => {
        quantidade++;
        numeroSpan.textContent = quantidade;
    });

    //Quando clica no botão "-", diminui a quantidade (mas nunca abaixo de 1). 
    // Se tentar, mostra um alerta.
    btnMenos.addEventListener("click", () => {
        if (quantidade > 1) {
            quantidade--;
            numeroSpan.textContent = quantidade;
        } else {
            alert("A quantidade mínima é 1 ingresso.");
        }
    });

    btnVerTotal.addEventListener("click", () => { //Quando o usuário clica em "Ver Total":
        const setor = setorSelect.value; //Verifica qual setor foi escolhido

        if (setor === "Leste (VIP)") {  //Se for VIP: Muda o preço para o valor VIP e Mostra os benefícios do ingresso VIP
            inputPreco.value = ingressoVip.preco; //Muda o preço para o valor VIP
            beneficiosEl.textContent = ingressoVip.mostrarBeneficios(); //Mostra os benefícios do ingresso VIP
            socioCheckbox.checked = true; // marca sócio
          } else { //Se for normal:  Muda o preço para o valor normal e Limpa os benefícios
            inputPreco.value = ingressoNormal.preco; //Muda o preço para o valor normal
            beneficiosEl.textContent = ""; //Limpa os benefícios
             socioCheckbox.checked = false; // desmarca sócio
        }
          atualizarResumo(); // ✅ calcula tudo aqui
        //atualizarTotal();  //Depois, chama atualizarTotal() para calcular e mostrar os valores
        console.log("Resumo atualizado com sucesso.");
    });


   // =============================
   // Quando o setor muda - vip marcar checkbox  e benefício - normal desmarcar checkbox e beneício
   // =============================

   setorSelect.addEventListener("change", () => {
    console.log("Setor mudou!");
    const socioCheckbox = document.querySelector("#socio");

    if (setorSelect.value === "Leste (VIP)") {
        socioCheckbox.checked = true;
        beneficiosEl.textContent = "Você escolheu o setor VIP! Benefícios: descontos ao lounge, bebidas inclusas e cadeira premium.";
    } else {
        socioCheckbox.checked = false;
        beneficiosEl.textContent = "";
    }

     // ✅ Atualiza subtotal e total com o desconto
    atualizarResumo();
});

btnVerTotal.addEventListener("click", () => {
    console.log("Botão Ver Total clicado!");
    const setor = setorSelect.value;

    switch (setor) {
        case "Leste (VIP)":
            inputPreco.value = ingressoVip.preco;
            beneficiosEl.textContent = ingressoVip.mostrarBeneficios();
            break;
        case "Arquibancada Norte":
            inputPreco.value = ingressoNormal.preco;
            beneficiosEl.textContent = "";
            break;
        default:
            inputPreco.value = 0;
            beneficiosEl.textContent = "Setor inválido.";
    }

    atualizarTotal();
});













// =============================
// 'barra de progresso'
// =============================

let etapaAtual = 1; // começa na etapa 1
const steps = document.querySelectorAll(".progressStep");

function atualizarBarra() {
    for (let i = 0; i < steps.length; i++) {
        if (i < etapaAtual) {
            steps[i].classList.add("active");
        } else {
            steps[i].classList.remove("active");
        }
    }
}


// Avançar etapa ao clicar em Ver Total ou Comprar Mais
document.querySelector(".comprar-mais").addEventListener("click", () => {
    if (etapaAtual < steps.length) {
        etapaAtual++;
        atualizarBarra();
    }
});

atualizarBarra(); // inicializa




// =============================
// para esconder o conteúdo da div
// =============================

// Elementos principais                    
const etapaMapa = document.querySelector(".etapaMapa");
const continuarBtn = document.querySelector(".continuar");
const infoJogo = document.querySelector(".infoTimeIngresso");
const quantidadeInput = document.querySelector(".controleQuantidade .numero");
const precoInput = document.getElementById("preco");  
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const socioCheckbox = document.getElementById("socio");
//let taxaConveniencia = 5;

// Assentos                                  
const assentos = document.querySelectorAll(".mapaEstadio button");
let assentosSelecionados = [];

// Inicializa quantidade de ingressos
let quantidadeIngressos = parseInt(quantidadeInput.textContent);

// Função para atualizar subtotal e total
function atualizarResumo() {
  
  let subtotal = parseFloat(precoInput.value) * quantidadeIngressos;
  if (socioCheckbox.checked) {
    subtotal *= 0.9; // aplica 10% de desconto
  }
  subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
  totalEl.textContent = `R$ ${(subtotal + taxaConveniencia).toFixed(2)}`;
}
socioCheckbox.addEventListener("change", atualizarResumo);


// Atualiza quantidade ao clicar nos botões
document.querySelector(".mais").addEventListener("click", () => {
  quantidadeIngressos++;
  quantidadeInput.textContent = quantidadeIngressos;
  //atualizarResumo();
});

document.querySelector(".menos").addEventListener("click", () => {
  if (quantidadeIngressos > 1) {
    quantidadeIngressos--;
    quantidadeInput.textContent = quantidadeIngressos;
    //atualizarResumo();
  }
});

// Atualiza resumo ao marcar/desmarcar sócio
socioCheckbox.addEventListener("change", atualizarResumo);





// =============================
// Função para atualizar o estado do botão continuar
// =============================

function atualizarContinuar() {
  continuarBtn.disabled = assentosSelecionados.length !== quantidadeIngressos;
}

// Clique nos assentos
assentos.forEach(assento => {
  assento.addEventListener("click", () => {
    const index = assentosSelecionados.indexOf(assento);

    if (index > -1) {
      assento.List.remove("selecionado");
      assentosSelecionados.splice(index, 1);
    } else {
      if (assentosSelecionados.length < quantidadeIngressos) {
        assento.classList.add("selecionado");
        assentosSelecionados.push(assento);
      } else {
        alert(`Você só pode selecionar ${quantidadeIngressos} assento(s).`);
      }
    }

    atualizarContinuar();
  });
});





// =============================
// Clique no botão continuar (prosseguir para a proxima etapa e mudar a cor para rosa)
// =============================

continuarBtn.addEventListener("click", () => {
  const mapaVisivel = etapaMapa.style.display === "block"; // verifica se o mapa já está sendo exibido

  //  Etapa 1 → Etapa 2 (exibe o mapa e avança a barra)
  if (!mapaVisivel) {
    quantidadeIngressos = parseInt(quantidadeInput.textContent);
    assentosSelecionados = [];
    assentos.forEach(a => a.classList.remove("selecionado"));

    infoJogo.style.display = "none";
    document.querySelector(".nomeTimeIngressoTotal").style.display = "none";
    etapaMapa.style.display = "block";
    continuarBtn.scrollIntoView({ behavior: "smooth" });
    atualizarContinuar();

    //  Atualiza a barra de progresso (faz a bolinha 2 ficar rosa)
    if (etapaAtual < steps.length) {
      etapaAtual++;
      atualizarBarra();
      console.log("Avançou para etapa:", etapaAtual);
    }

    return;
  }

  //  Etapa 2 → Etapa 3 (confirma assentos)
  if (assentosSelecionados.length !== quantidadeIngressos) {
    alert(`Selecione exatamente ${quantidadeIngressos} assento(s) antes de continuar.`);
    return;
  }

  alert("Assentos confirmados: " + assentosSelecionados.map(a => a.textContent).join(", "));



  //  Avança mais uma etapa (terceira bolinha rosa)
  if (etapaAtual < steps.length) {
    etapaAtual++;
    atualizarBarra();
    console.log("Avançou para etapa:", etapaAtual);
  }
});


// Inicializa resumo
atualizarResumo();







// =============================

// =============================

document.addEventListener("DOMContentLoaded", () => {
  // --- VARIÁVEIS PRINCIPAIS ---
  const etapaInfo = document.querySelector(".infoTimeIngresso"); // etapa 1
  const etapaMapa = document.querySelector(".etapaMapa");       // etapa 2
  const etapaPagamento = document.querySelector(".etapaDoPagamento"); // etapa 3 

  const continuarBtn = document.querySelector(".continuar");           
  const confirmarAssentoBtn = document.querySelector(".confirmarAssento"); 
                                              
  const assentos = document.querySelectorAll(".mapaEstadio button");
  const socioCheckbox = document.querySelector("#socio");                 
  const socioPagamento = document.querySelector("#socioPagamentoPagamento"); 

  const subtotalPagamento = document.querySelector("#subtotalPagamento");
  const totalPagamento = document.querySelector("#totalPagamento");
  const precoInput = document.querySelector("#preco");
  const numeroIngressosEl = document.querySelector(".numero");
  const taxaConveniencia = 5;

  const steps = document.querySelectorAll(".progress-step");
  const lines = document.querySelectorAll(".progress-line");

  let assentosSelecionados = [];
  let etapaAtual = 1; // começa na etapa 1

  // --- FUNÇÃO: ATUALIZA BARRA DE PROGRESSO ---
  function atualizarBarra() {
    steps.forEach((step, index) => {
        if (index < etapaAtual) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });

    
    // Atualiza também as linhas (entre as bolinhas) usando while
    let i = 0;
    while (i < lines.length) {
        if (i < etapaAtual - 1) {
            lines[i].classList.add("active");
        } else {
            lines[i].classList.remove("active");
        }
        i++;
    }

}




  // --- FUNÇÃO: ATUALIZA VALORES PAGAMENTO ---
  function atualizarPagamento() {
    const quantidadeIngressos = parseInt(numeroIngressosEl.textContent);
    let subtotal = parseFloat(precoInput.value) * quantidadeIngressos;
    if (socioPagamento.checked) subtotal *= 0.9; // aplica 10% desconto
    subtotalPagamento.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalPagamento.textContent = `R$ ${(subtotal + taxaConveniencia).toFixed(2)}`;
  }


// =============================
  // --- ETAPA 1 → ETAPA 2 ---
// =============================

  continuarBtn.addEventListener("click", () => {
    etapaInfo.style.display = "none";
    etapaMapa.style.display = "block";

    etapaAtual = 2; // agora na etapa 2
    atualizarBarra();
  });

  // --- SELEÇÃO DE ASSENTOS ---
  assentos.forEach((assento) => {
    assento.addEventListener("click", () => {
      const quantidadeIngressos = parseInt(numeroIngressosEl.textContent); // pega valor atualizado

      // Bloqueia cliques em assentos VIP se não for sócio
      if (assento.classList.contains("vip") && !socioCheckbox.checked) return;

      if (assentosSelecionados.includes(assento)) {
        // Desmarca se já estava selecionado
        assento.classList.remove("selecionado");
        assentosSelecionados = assentosSelecionados.filter(a => a !== assento);
      } else {
        // Só adiciona se ainda não atingiu a quantidade
        if (assentosSelecionados.length < quantidadeIngressos) {
          assento.classList.add("selecionado");
          assentosSelecionados.push(assento);
        } else {
          alert(`Você já selecionou ${quantidadeIngressos} assento(s).`);
        }
      }
    });
  });


// =============================
  // --- ETAPA 2 → ETAPA 3 ---
// =============================

  confirmarAssentoBtn.addEventListener("click", () => {
    const quantidadeIngressos = parseInt(numeroIngressosEl.textContent); // pega valor atualizado

    if (assentosSelecionados.length !== quantidadeIngressos) {
      alert(`Selecione exatamente ${quantidadeIngressos} assento(s) antes de continuar.`);
      return;
    }

    alert("Assentos confirmados: " + assentosSelecionados.map(a => a.textContent).join(", "));

    // Mostra etapa pagamento
    etapaMapa.style.display = "none";
    etapaPagamento.style.display = "block";

    // Configura checkbox de sócio na etapa 3
    const socioAreaPagamento = document.querySelector("#socioAreaPagamento");

    if (socioCheckbox.checked) {
      socioAreaPagamento.style.display = "block"; // mostra área
      socioPagamento.checked = true;
      socioPagamento.disabled = true; // bloqueado
    } else {
      socioAreaPagamento.style.display = "none"; // oculta
      socioPagamento.checked = false;
      socioPagamento.disabled = true;
    }

    atualizarPagamento();

    etapaAtual = 3;
    atualizarBarra();
  });

  // Inicializa barra de progresso
  atualizarBarra();
});





// --- ETAPA 3 → ETAPA 4 ---
// --- ETAPA 3 → ETAPA 4 + Botão Voltar ao Início ---
document.addEventListener("DOMContentLoaded", () => {
    const finalizarCompraBtn = document.querySelector(".finalizarCompra");
    const etapaPagamento = document.querySelector(".etapaDoPagamento");
    const etapaResumoFinal = document.querySelector(".etapaResumoFinal");
    const btnVoltarInicio = document.querySelector(".btn-voltar-inicio");

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", () => {
            // --- Coleta os dados da compra ---
            const partida = document.getElementById("partida").value;
            const data = document.getElementById("dataJogo").value;
            const hora = document.getElementById("horaJogo").value;
            const local = document.getElementById("local").value;
            const setor = document.getElementById("setor").value;
            const quantidade = document.querySelector(".numero").textContent;
            const subtotal = document.getElementById("subtotalPagamento").textContent;
            const total = document.getElementById("totalPagamento").textContent;
            const socioAtivo = document.getElementById("socio").checked;
            const desconto = socioAtivo ? "10%" : "0%";  //Operador terário
            const assentos = assentosSelecionados.map(a => a.textContent).join(", ");
            const pagamento = document.querySelector('input[name="tipoPagamento"]:checked').value.toUpperCase();

            // --- Preenche os campos do resumo final ---
            document.getElementById("resumoPartida").textContent = partida;
            document.getElementById("resumoData").textContent = data;
            document.getElementById("resumoHora").textContent = hora;
            document.getElementById("resumoLocal").textContent = local;
            document.getElementById("resumoSetor").textContent = setor;
            document.getElementById("resumoAssentos").textContent = assentos;
            document.getElementById("resumoQuantidade").textContent = quantidade;
            document.getElementById("resumoSubtotal").textContent = subtotal;
            document.getElementById("resumoDesconto").textContent = desconto;
            document.getElementById("resumoPagamento").textContent = pagamento;
            document.getElementById("resumoTotal").textContent = total;

            // --- Mostra etapa 4 e oculta pagamento ---
            etapaPagamento.style.display = "none";
            etapaResumoFinal.style.display = "block";
            etapaResumoFinal.scrollIntoView({ behavior: "smooth" });

            // --- Atualiza barra de progresso ---
            const progressSteps = document.querySelectorAll(".progress-step");
            const progressLines = document.querySelectorAll(".progress-line");

            if (progressLines[2]) progressLines[2].classList.add("active");
            if (progressSteps[3]) progressSteps[3].classList.add("active");
        });
    }

    // --- Botão "Voltar ao Início" ---
    if (btnVoltarInicio) {
        btnVoltarInicio.addEventListener("click", () => {
            // Reinicia a página inteira
            window.location.reload();
        });
    }
});








// =============================
// 🎯 ETAPA 4 — RESUMO FINAL
// =============================
    document.addEventListener("DOMContentLoaded", () => {
    const finalizarCompraBtn = document.querySelector(".finalizarCompra");
    const etapaPagamento = document.querySelector(".etapaDoPagamento");
    const etapaResumoFinal = document.querySelector(".etapaResumoFinal");

    finalizarCompraBtn.addEventListener("click", () => {
        // --- Preenche resumo ---
        const partida = document.getElementById("partida").value;
        const data = document.getElementById("dataJogo").value;
        const hora = document.getElementById("horaJogo").value;
        const local = document.getElementById("local").value;
        const setor = document.getElementById("setor").value;
        const quantidade = document.querySelector(".numero").textContent;
        const subtotal = document.getElementById("subtotalPagamento").textContent;
        const total = document.getElementById("totalPagamento").textContent;
        const socioAtivo = document.getElementById("socio").checked;
        const desconto = socioAtivo ? "10%" : "0%";
        const assentos = assentosSelecionados.map(a => a.textContent).join(", ");
        const pagamento = document.querySelector('input[name="tipoPagamento"]:checked').value.toUpperCase();

        document.getElementById("resumoPartida").textContent = partida;
        document.getElementById("resumoData").textContent = data;
        document.getElementById("resumoHora").textContent = hora;
        document.getElementById("resumoLocal").textContent = local;
        document.getElementById("resumoSetor").textContent = setor;
        document.getElementById("resumoAssentos").textContent = assentos;
        document.getElementById("resumoQuantidade").textContent = quantidade;
        document.getElementById("resumoSubtotal").textContent = subtotal;
        document.getElementById("resumoDesconto").textContent = desconto;
        document.getElementById("resumoPagamento").textContent = pagamento;
        document.getElementById("resumoTotal").textContent = total;

        // --- Mostra etapa 4 ---
        etapaPagamento.style.display = "none";
        etapaResumoFinal.style.display = "block";
        etapaResumoFinal.scrollIntoView({ behavior: "smooth" });

        // --- Atualiza progresso visual (deixa etapa 4 rosa) ---
        const progressSteps = document.querySelectorAll(".progress-step");
        const progressLines = document.querySelectorAll(".progress-line");

        // Deixa a linha entre 3 e 4 rosa
        if (progressLines[2]) {
            progressLines[2].classList.add("active");
        }

        // Deixa a bolinha 4 rosa
        if (progressSteps[3]) {
            progressSteps[3].classList.add("active");
        }
    });
});
