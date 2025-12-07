V/* script.js
   Controle de abas (single-page), tema e validação do formulário.
   Comentários concisos explicam cada bloco (exigido pela atividade).
*/

/* -------------------------
   Seleção de elementos importantes
   ------------------------- */
const tabs = document.querySelectorAll('.tab');          // botões da sidebar
const panels = document.querySelectorAll('.tab-panel'); // seções do conteúdo
const hambBtn = document.getElementById('hamb');        // botão hamburger (mobile)
const tabsWrapper = document.querySelector('.tabs');    // wrapper das abas (pode ser null)
const themeToggle = document.getElementById('theme-toggle'); // botão para alternar tema

/* -------------------------
   Função para ativar uma aba (mostra a seção e atualiza aria-selected)
   - targetId: id da seção ('sobre', 'formacao', 'portfolio', 'contato')
   ------------------------- */
function activateTab(targetId) {
  panels.forEach(panel => {
    if (panel.id === targetId) panel.classList.add('active');
    else panel.classList.remove('active');
  });

  tabs.forEach(tab => {
    if (tab.dataset.target === targetId) tab.setAttribute('aria-selected', 'true');
    else tab.setAttribute('aria-selected', 'false');
  });

  // rolar ao topo do conteúdo para melhor UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* -------------------------
   Inicialização após DOM pronto
   - define aba inicial e aplica tema salvo
   ------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // mostrar 'sobre' por padrão
  activateTab('sobre');

  // aplicar tema salvo (se existir)
  const saved = localStorage.getItem('portfolio-theme') || 'light';
  setTheme(saved);
});

/* -------------------------
   Tornar cada botão clicável para ativar sua aba
   ------------------------- */
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    activateTab(target);

    // fechar menu mobile caso esteja aberto (evita que fique sobre o conteúdo)
    if (tabsWrapper) tabsWrapper.classList.remove('open');
  });
});

/* -------------------------
   Hamburger mobile: mostrar/ocultar abas no mobile
   - protege caso o botão não exista
   ------------------------- */
if (hambBtn && tabsWrapper) {
  hambBtn.addEventListener('click', () => {
    tabsWrapper.classList.toggle('open');
  });
}

/* -------------------------
   Tema claro/escuro (salva preferência)
   - função simples que atualiza data-theme no body
   ------------------------- */
function setTheme(t) {
  document.body.setAttribute('data-theme', t);
  localStorage.setItem('portfolio-theme', t);
}

/* registra o evento somente se o botão existir (evita erros no console) */
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const cur = document.body.getAttribute('data-theme') || 'light';
    setTheme(cur === 'light' ? 'dark' : 'light');
  });
}

/* -------------------------
   Validação do formulário (Contato)
   - verifica campos obrigatórios
   - valida formato do e-mail com regex simples
   - simula envio limpando campos e mostrando mensagem
   ------------------------- */
const form = document.getElementById('contactForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const nomeError = document.getElementById('nomeError');
const emailError = document.getElementById('emailError');
const mensagemError = document.getElementById('mensagemError');
const statusMsg = document.getElementById('statusMsg');

/* validação básica de email (suficiente para a atividade) */
function validaEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // limpar mensagens anteriores
    nomeError.textContent = '';
    emailError.textContent = '';
    mensagemError.textContent = '';
    statusMsg.textContent = '';

    let ok = true;

    // validações essenciais exigidas pela atividade
    if (!nome.value.trim()) {
      nomeError.textContent = 'Por favor insira seu nome.';
      ok = false;
    }
    if (!email.value.trim()) {
      emailError.textContent = 'Por favor insira seu e-mail.';
      ok = false;
    } else if (!validaEmail(email.value.trim())) {
      emailError.textContent = 'Formato de e-mail inválido. Ex: usuario@dominio.com';
      ok = false;
    }
    if (!mensagem.value.trim()) {
      mensagemError.textContent = 'Por favor escreva uma mensagem.';
      ok = false;
    }

    if (!ok) {
      statusMsg.textContent = 'Corrija os campos em destaque.';
      return;
    }

    // Simulação de envio: limpa campos e mostra confirmação
    nome.value = '';
    email.value = '';
    mensagem.value = '';
    statusMsg.textContent = 'Mensagem enviada com sucesso! Obrigada.';

    // alerta adicional (opcional) para reforçar que a simulação ocorreu
    alert('Mensagem enviada com sucesso!');
  });
}
