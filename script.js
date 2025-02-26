const avaliacoes = [
  {
      pergunta: "1/3: Você compraria esse produto para sua casa ou como presente para uma pessoa?",
      opcoes: [
          "1. Sim, compraria para minha casa e colocaria na minha sala.",
          "2. Não, não achei o produto interessante."
      ],
      imagem: "images/produto1.png",
      valor: 18.97
  },
  {
      pergunta: "2/3: Você teria um desses tapetes antiderrapantes?",
      opcoes: [
          "1. Sim, gostei muito do produto.",
          "2. Não, esse produto não me passou credibilidade pelas fotos."
      ],
      imagem: "images/produto2.png",
      valor: 38.65
  },
  {
      pergunta: "3/3: Qual nota você dá de 0 a 10 para esse produto?",
      opcoes: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      imagem: "images/produto3.png",
      valor: 44.62
  }
];

let indiceAtual = 0;
let saldoAtual = 0;

function carregarAvaliacao() {
  if (indiceAtual >= avaliacoes.length) {
    document.getElementById("avaliacao-container").innerHTML = `
    <div class="final-message">
        <h2>Parabéns, Fernando!</h2>
        <h3>Você concluiu todas as avaliações</h3>
        <h3>Saldo Total: R$ 102,24</h3>
    </div>
    <div class="home-link">
        <a href="home.html" class="home-icon">
            <i class="fa-solid fa-house"></i>
        </a>
    </div>
`;
    return;
  }

  let avaliacao = avaliacoes[indiceAtual];

  let html = `
      <img src="${avaliacao.imagem}" class="produto-img">
      <p class="pergunta">${avaliacao.pergunta}</p>
  `;

  if (indiceAtual === 2) {
    // Criar os botões em 2 colunas (0-5 e 6-10)
    html += `<div class="opcoes grid-2colunas">`;

    for (let i = 0; i <= 10; i++) {
      html += `<button class="btn" onclick="responderAvaliacao(${i})">${i}</button>`;
    }

    html += `</div>`;
} else {
    // Exibir opções normais para as avaliações 1 e 2
    html += `<div class="opcoes">`;
    avaliacao.opcoes.forEach((opcao, index) => {
      html += `<button class="btn" onclick="responderAvaliacao(${index})">${opcao}</button>`;
    });
    html += `</div>`;
  }

  document.getElementById("avaliacao-container").innerHTML = html;
}


function responderAvaliacao(index) {
  let ganho = avaliacoes[indiceAtual].valor;
  saldoAtual += ganho;
  document.getElementById("saldo").textContent = saldoAtual.toFixed(2).replace(".", ",");

  alert(`Parabéns, você ganhou R$${ganho.toFixed(2).replace(".", ",")}`);

  indiceAtual++;
  carregarAvaliacao();
}


// Abrir modal de saque
function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

// Fechar modal e exibir mensagem de saque realizado
function realizarSaque() {
    let quantia = document.getElementById("quantia-saque").value;

    if (quantia === "" || quantia <= 0) {
        alert("Digite um valor válido para sacar.");
        return;
    }

    // Substituir apenas o conteúdo da caixinha do modal
    let modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
        <h3 style="color: #ff6a00;">Saque realizado com sucesso!</h3>
    `;

    // Fechar o modal automaticamente após 2 segundos
    setTimeout(() => {
        document.getElementById("modal").style.display = "none";
    }, 2000);
}

  document.getElementById("modal").style.display = "none";

  // Substituir conteúdo pelo sucesso do saque
  document.querySelector(".home-container").innerHTML = `
      <div class="sucesso">
          Saque realizado com sucesso!
      </div>
  `;
}

// Inicia a primeira avaliação ao carregar a página
document.addEventListener("DOMContentLoaded", carregarAvaliacao);
