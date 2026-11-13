# 🟢 MATRIX OS v5.0.0

> "Wake up, Neo..." 

Um portfólio interativo em formato de terminal, inspirado no universo de Matrix. Construído do zero com HTML, CSS e JavaScript puro (Vanilla), sem frameworks e sem bibliotecas externas de interface. O objetivo foi unir minha paixão pelo filme com o desenvolvimento web, criando uma experiência imersiva para quem visita.

🔗 **[Acesse o projeto ao vivo aqui](https://carlosaraujo777.github.io/matrix-portfolio/)**

---

## 📸 O que você vai encontrar
- **Chuva de código permanente:** Um fundo animado com Canvas API que simula a clássica chuva de letras do filme, rodando o tempo todo.
- **Terminal 100% interativo:** Você pode (e deve) digitar comandos reais.
- **Design responsivo:** Interface escura com transparência (Glassmorphism) para que a chuva apareça por trás do terminal.
- **Easter eggs:** Teste o comando `matrix` para ver o que acontece.

## 🕹️ Comandos Disponíveis

Digite qualquer um destes comandos no terminal e aperte `Enter`:

| Comando | Descrição |
|---------|-----------|
| `help` | Mostra a lista de todos os comandos |
| `about` | Um pouco sobre quem eu sou |
| `skills` | Minhas tecnologias e ferramentas |
| `projects` | Lista dos meus principais projetos |
| `contact` | Como entrar em contato comigo |
| `matrix` | Acelera a chuva de código por 5 segundos |
| `clear` | Limpa o histórico da tela do terminal |

**Dica de Dev:** Você pode usar a tecla `Tab` para autocompletar os comandos e as setas `↑` e `↓` para navegar pelo histórico de comandos, igualzinho a um terminal real.

## 🛠️ Tecnologias Utilizadas

Tudo foi feito na unha, sem dependências:

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização do terminal, animações, layout com Flexbox, backdrop-filter para o efeito de vidro e variáveis de ambiente.
- **JavaScript (ES6+):**
  - **Canvas API:** Para renderizar a chuva de letras (Matrix Rain) a ~30fps.
  - **DOM Manipulation:** Para criar as linhas de resposta do terminal dinamicamente.
  - **Lógica de Terminal:** Sistema de objetos para os comandos, histórico de inputs, e listeners para eventos de teclado (Enter, Tab, ArrowUp, ArrowDown).
- **GitHub Pages:** Deploy e hospedagem.

## 🚀 Como rodar na sua máquina

Como o projeto não usa build tools (Webpack, Vite, etc), rodar é muito simples:

1. Clone o repositório:
   ```bash
   git clone https://github.com/carlosaraujo777/matrix-portfolio.git
