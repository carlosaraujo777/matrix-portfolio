// ===== ESCOLHA DAS PÍLULAS =====
const telaPilulas = document.getElementById("tela-pilulas");
const telaTerminal = document.getElementById("tela-terminal");
const btnVermelha = document.getElementById("btn-vermelha");
const btnAzul = document.getElementById("btn-azul");

// PÍLULA VERMELHA: entra no terminal
btnVermelha.addEventListener("click", () => {
  telaPilulas.classList.add("escondido"); // esconde as pílulas
  telaTerminal.classList.remove("escondido"); // mostra o terminal
  document.getElementById("terminal-input").focus(); // foca no input
});

// PÍLULA AZUL: tela de ERROR
btnAzul.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="tela-erro">
      <h1>ERROR: Reality failed to load.</h1>
    </div>
  `;
  // Dá umas piscadas de tela vermelha de fundo
  setInterval(() => {
    document.body.style.background = document.body.style.background === "red" ? "#000" : "red";
  }, 200);
});
// ===== CHUVA DE CÓDIGO (Canvas) =====
const canvas = document.getElementById("matrix-rain");
const ctx = canvas.getContext("2d");

let colunas, fontSize, drops;
let velocidade = 33;

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fontSize = 16;
  colunas = Math.floor(canvas.width / fontSize);
  drops = Array(colunas).fill(1);
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const letras =
  "アカサタナハマヤラワｱｲｳｴｵ012345678910ABCDEFGHIJKLMNOPQRSTUVWXYZぁあぃぅぇぉかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ";

function desenharChuva() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const letra = letras.charAt(Math.floor(Math.random() * letras.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(letra, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

let chuvaInterval = setInterval(desenharChuva, velocidade);

// ===== TERMINAL E COMANDOS =====
const body = document.getElementById("terminal-body");
const input = document.getElementById("terminal-input");

const comandos = {
  help: () => {
    return `Comandos disponíveis:
  help       → mostra esta lista
  about      → quem sou eu
  skills     → minhas tecnologias
  projects   → meus projetos
  contact    → como me achar
  sudo       → teste de permissão
  matrix     → acelera a chuva por 5s
  clear      → limpa o terminal`;
  },
  about: () => {
    return `Carlos Alexandre, 21 anos, Agrocomputação (FATEC Cuiabá).
Dev focado em dados + web. AuDHD, ansioso, mas não desisto.
Lema: "Eu vou vencer, nem que seja um segundo de cada vez."`;
  },
  skills: () => {
    return `Python, Pandas, SQL (SQLite/PostgreSQL), JavaScript,
HTML, CSS, FastAPI, Streamlit, Chart.js, Power BI (DAX),
Git/GitHub, Deploy (Vercel, Render, GitHub Pages).`;
  },
  projects: () => {
    return `→ Seychelles (privado) — dashboard pessoal AuDHD
→ AgroConnect — full stack FastAPI + SQLite
→ AgroIA — chat com Google Gemini
→ LogiAgro — marketplace de frete
→ AgroSim — simulador de margem agrícola
→ Terminal Matrix — este aqui 😎
→ Pipeline ETL Olist — automação Python
→ Dashboards Power BI — e-commerce + CONAB`;
  },
  contact: () => {
    return `GitHub:   github.com/carlosaraujo777
LinkedIn: linkedin.com/in/carlosaraujo777
Email:    (carlinhox447@gmail.com)`;
  },
    sudo: () => {
    // Manda a primeira mensagem normal no terminal
    adicionarLinha("root@matrix:~$ sudo init hack_kernel", "comando");
    
    // Cria uma sequência de mensagens com delay (setTimeout)
    setTimeout(() => adicionarLinha("Iniciando override de kernel...", "resposta"), 500);
    setTimeout(() => adicionarLinha("Bypass na firewall principal... [OK]", "resposta"), 1200);
    setTimeout(() => adicionarLinha("Injetando payload no sistema... [OK]", "resposta"), 1900);
    setTimeout(() => adicionarLinha("DESCRIPTOGRAFANDO SEGREDOS DO GOVERNO... [OK]", "comando"), 2600);
    
    // O plot twist
    setTimeout(() => {
      adicionarLinha("ERRO: Tentativa de invasão detectada pelo sistema.", "erro");
      adicionarLinha("Acesso negado: nice try. 😏", "erro");
    }, 3500);

    // Retorna null pro sistema não imprimir a resposta padrão de uma vez
    return null;
  },
  matrix: () => {
    clearInterval(chuvaInterval);
    chuvaInterval = setInterval(desenharChuva, 10);
    setTimeout(() => {
      clearInterval(chuvaInterval);
      chuvaInterval = setInterval(desenharChuva, velocidade);
    }, 7000);
    return "Wake up, Neo... 🐇🔴";
  },
  clear: () => {
    const paragrafos = body.querySelectorAll("p");
    paragrafos.forEach((p) => {
      if (
        !p.classList.contains("prompt-line") &&
        !p.classList.contains("boas-vindas")
      ) {
        p.remove();
      }
    });
    return null;
  },
};

// ===== HISTÓRICO E AUTOCOMPLETE =====
let historico = [];
let indiceHistorico = -1;

input.addEventListener("keydown", (e) => {
  // TAB (Autocomplete)
  if (e.key === "Tab") {
    e.preventDefault();
    const valor = input.value.toLowerCase().trim();
    if (!valor) return;
    const match = Object.keys(comandos).find((cmd) => cmd.startsWith(valor));
    if (match) input.value = match;
    return;
  }

  // SETA PRA CIMA (Histórico)
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historico.length === 0) return;
    if (indiceHistorico === -1) indiceHistorico = historico.length - 1;
    else if (indiceHistorico > 0) indiceHistorico--;
    input.value = historico[indiceHistorico];
    return;
  }

  // SETA PRA BAIXO (Histórico)
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historico.length === 0 || indiceHistorico === -1) return;
    if (indiceHistorico < historico.length - 1) {
      indiceHistorico++;
      input.value = historico[indiceHistorico];
    } else {
      indiceHistorico = -1;
      input.value = "";
    }
    return;
  }

  // ENTER (Executar comando)
  if (e.key === "Enter") {
    const texto = input.value.trim();
    input.value = "";

    if (texto === "") return;

    historico.push(texto);
    indiceHistorico = -1;

    adicionarLinha(`root@matrix:~$ ${texto}`, "comando");

    const cmd = comandos[texto.toLowerCase()];

    if (cmd) {
      const resposta = cmd();
      if (resposta) adicionarLinha(resposta, "resposta");
    } else {
      adicionarLinha(`command not found: ${texto}`, "erro");
    }
  }
});

// ===== FUNÇÃO DE ESCREVER NO TERMINAL =====
function adicionarLinha(texto, tipo = "resposta") {
  const linhas = texto.split("\n");

  linhas.forEach((linha) => {
    const p = document.createElement("p");
    p.textContent = linha;
    if (tipo === "comando") p.style.color = "rgb(229, 255, 0)";
    if (tipo === "erro") p.style.color = "rgb(255, 0, 0)";
    body.insertBefore(p, body.lastElementChild);
  });

  body.scrollTop = body.scrollHeight;
}