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
  "アカサタナハマヤラワｱｲｳｴｵ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

// ===== TERMINAL =====
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
Email:    (adiciona aqui teu email)`;
  },
  matrix: () => {
    clearInterval(chuvaInterval);
    chuvaInterval = setInterval(desenharChuva, 10);
    setTimeout(() => {
      clearInterval(chuvaInterval);
      chuvaInterval = setInterval(desenharChuva, velocidade);
    }, 5000);
    return "Wake up, Neo... 🐇 (chuva acelerada por 5s)";
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

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const texto = input.value.trim();
  input.value = "";

  if (texto === "") return;

  adicionarLinha(`root@matrix:~$ ${texto}`, "comando");

  const cmd = comandos[texto.toLowerCase()];

  if (cmd) {
    const resposta = cmd();
    if (resposta) adicionarLinha(resposta, "resposta");
  } else {
    adicionarLinha(`command not found: ${texto}`, "erro");
  }
});

function adicionarLinha(texto, tipo = "resposta") {
  const linhas = texto.split("\n");

  linhas.forEach((linha) => {
    const p = document.createElement("p");
    p.textContent = linha;
    if (tipo === "comando") p.style.color = "#0ff";
    if (tipo === "erro") p.style.color = "#f55";
    body.insertBefore(p, body.lastElementChild);
  });

  body.scrollTop = body.scrollHeight;
}
// ===== AUTOCOMPLETE COM TAB + HISTÓRICO COM SETAS =====
let historico = [];
let indiceHistorico = -1;

input.addEventListener("keydown", (e) => {
  // Se for TAB
  if (e.key === "Tab") {
    e.preventDefault(); // impede de sair do input
    const valor = input.value.toLowerCase().trim();
    if (!valor) return;

    // Acha o primeiro comando que começa com o que foi digitado
    const match = Object.keys(comandos).find((cmd) => cmd.startsWith(valor));
    if (match) input.value = match;
  }

  // Se for SETA PRA CIMA
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historico.length === 0) return;
    if (indiceHistorico === -1) indiceHistorico = historico.length - 1;
    else if (indiceHistorico > 0) indiceHistorico--;
    input.value = historico[indiceHistorico];
  }

  // Se for SETA PRA BAIXO
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
  }
});

// ===== SALVAR NO HISTÓRICO QUANDO APERTAR ENTER =====
// (Precisamos modificar o listener do Enter que já existe)
// Vai na parte do código que tem "input.addEventListener("keydown", (e) => { if (e.key !== "Enter") return;"
// E adiciona logo depois do "input.value = "";":
// historico.push(texto);
// indiceHistorico = -1;