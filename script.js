/**
 * ESPAÇO VIVÊNCIAS - SCRIPT PRINCIPAL
 * Configuração centralizada e interações funcionais.
 */

// ==========================================================================
// 1. OBJETO CENTRAL DE CONFIGURAÇÃO (CONFIG)
// Modifique aqui caso decida alternar o endereço para Maricá ou alterar o WhatsApp.
// ==========================================================================
const CONFIG = {
  nome: "Espaço Vivências, Consultório de Psicologia",
  whatsappNumero: "5521973352918",
  whatsappFormatado: "(21) 97335-2918",
  mensagemPadrao: "Olá! Vim pelo site do Espaço Vivências e gostaria de agendar uma conversa.",
  
  // Dados de Localização (Realengo / Maricá)
  endereco: "R. Piraquara, 90 - Realengo, Rio de Janeiro - RJ, 21755-271",
  enderecoCurto: "R. Piraquara, 90 - Realengo, RJ",
  localHero: "Presencial em Realengo",
  googleMapsUrl: "https://www.google.com/maps?q=R.+Piraquara,+90+-+Realengo,+Rio+de+Janeiro+-+RJ,+21755-271&output=embed",
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Espaço+Vivências+Realengo",
  
  // Horários e Social
  horarioAtendimento: "Atendimento até às 20h",
  horarioCompleto: "Atendimento até às 20h (Segunda a Sexta)",
  instagram: "@espacovivenciaas",
  instagramUrl: "https://www.instagram.com/espacovivenciaas/"
};

// ==========================================================================
// 2. INICIALIZAÇÃO E APLICAÇÃO DE DADOS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracoes();
  configurarNavbarAoRolar();
  configurarLinksWhatsApp();
  configurarFormularioContato();
  configurarAnimacaoIntersectionObserver();
  configurarBotaoVoltarTopo();
  atualizarAnoRodape();
});

/**
 * Preenche elementos da página dinamicamente a partir do objeto CONFIG.
 */
function aplicarConfiguracoes() {
  const elHeroLocal = document.getElementById("hero-local-txt");
  if (elHeroLocal) elHeroLocal.textContent = CONFIG.localHero;

  const elHeroHorario = document.getElementById("hero-horario-txt");
  if (elHeroHorario) elHeroHorario.textContent = CONFIG.horarioAtendimento;

  const elInfoEndereco = document.getElementById("info-endereco");
  if (elInfoEndereco) elInfoEndereco.textContent = CONFIG.endereco;

  const elInfoHorario = document.getElementById("info-horario");
  if (elInfoHorario) elInfoHorario.textContent = CONFIG.horarioCompleto;

  const elInfoTelefone = document.getElementById("info-telefone");
  if (elInfoTelefone) {
    elInfoTelefone.textContent = CONFIG.whatsappFormatado;
    elInfoTelefone.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.mensagemPadrao)}`;
  }

  const elFooterEndereco = document.getElementById("footer-endereco");
  if (elFooterEndereco) elFooterEndereco.textContent = CONFIG.enderecoCurto;

  const elFooterHorario = document.getElementById("footer-horario");
  if (elFooterHorario) elFooterHorario.textContent = CONFIG.horarioAtendimento;

  const elIframeMapa = document.getElementById("google-maps-iframe");
  if (elIframeMapa) elIframeMapa.src = CONFIG.googleMapsUrl;

  const elGoogleReviewBtn = document.getElementById("google-review-btn");
  if (elGoogleReviewBtn) elGoogleReviewBtn.href = CONFIG.googleReviewUrl;
}

/**
 * Atualiza todos os links marcados com a classe .js-whatsapp-link para a mensagem padrão
 */
function configurarLinksWhatsApp() {
  const links = document.querySelectorAll(".js-whatsapp-link");
  const urlWa = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.mensagemPadrao)}`;
  links.forEach(link => {
    link.href = urlWa;
  });
}

/**
 * Adiciona sombra e cor de fundo à barra de navegação durante o scroll.
 */
function configurarNavbarAoRolar() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  const verificarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  window.addEventListener("scroll", verificarScroll, { passive: true });
  verificarScroll();
}

/**
 * Validação do formulário com Bootstrap e envio dos dados formatados para o WhatsApp.
 */
function configurarFormularioContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const modalidade = document.getElementById("assunto").value;
    const mensagemAdicional = document.getElementById("mensagem").value.trim();

    // Montagem da mensagem estruturada
    let textoWhats = `*Contato via Site - Espaço Vivências*\n\n`;
    textoWhats += `*Nome:* ${nome}\n`;
    textoWhats += `*Telefone:* ${telefone}\n`;
    textoWhats += `*Modalidade:* ${modalidade}\n`;
    if (mensagemAdicional) {
      textoWhats += `*Mensagem:* ${mensagemAdicional}\n`;
    }

    const urlDestino = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(textoWhats)}`;
    
    // Abre o WhatsApp em nova aba
    window.open(urlDestino, "_blank", "noopener,noreferrer");
    
    form.reset();
    form.classList.remove("was-validated");
  });
}

/**
 * Animação suave dos blocos com IntersectionObserver
 */
function configurarAnimacaoIntersectionObserver() {
  const elementos = document.querySelectorAll(".animate-fade");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  elementos.forEach(el => observer.observe(el));
}

/**
 * Controle de exibição e clique do botão Voltar ao Topo.
 */
function configurarBotaoVoltarTopo() {
  const btnTop = document.getElementById("btn-back-to-top");
  if (!btnTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
  }, { passive: true });

  btnTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Garante que o ano no rodapé esteja sempre sincronizado.
 */
function atualizarAnoRodape() {
  const elAno = document.getElementById("current-year");
  if (elAno) {
    elAno.textContent = new Date().getFullYear();
  }
}