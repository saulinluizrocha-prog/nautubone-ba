/* ============================================
   MAIN.JS — injeta os dados de OFFER_CONFIG
   nos elementos da página.
   ============================================ */

(function () {
  "use strict";

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const o = OFFER_CONFIG;
    const m = o.oferta.moeda;
    const de = o.oferta.precoDe;
    const por = o.oferta.precoPor;
    const disc = o.oferta.percentualDesconto;

    document.documentElement.lang = o.geo.idioma;

    // Preço - header sticky e hero
    setText("price-old-value", m + " " + de);
    setText("price-old-value-sticky", m + " " + de);
    setText("price-new-value", m + " " + por);
    setText("price-new-value-sticky", m + " " + por);
    setText("price-discount-value", "🔥 -" + disc + "% 🔥");

    // Textos do formulário 1
    setText("form-badge", o.textos.badgeOferta);
    setText("form-title", o.textos.tituloForm);
    setText("form-subtitle", o.textos.subtituloForm);
    setText("label-pais", o.textos.labelPais);
    setText("label-nome", o.textos.labelNome);
    setAttr("label_name", "placeholder", o.textos.placeholderNome);
    setText("label-telefone", o.textos.labelTelefone);
    setAttr("label_phone", "placeholder", o.textos.placeholderTelefone);
    setText("phone-ddi", o.geo.paisDDI);
    setText("ajuda-telefone", o.textos.ajudaTelefone);
    setText("cta-button-text", o.textos.botaoCta);
    setText("payment-info-text", o.textos.pagamento);
    setText("header-cta-text", o.textos.botaoCta.replace("🛒 ", ""));

    // País no select do form 1
    const paisOption = document.getElementById("pais-option");
    if (paisOption) {
      paisOption.value = o.geo.paisCodigo;
      paisOption.textContent = o.geo.paisNome + " (" + o.geo.paisDDI + ")";
    }

    // Preços - forms 2 e 3 e caixa do form 1
    ["", "2", "3"].forEach(function (suffix) {
      const oldEl = document.getElementById("form" + suffix + "-price-old");
      const newEl = document.getElementById("form" + suffix + "-price-new");
      const discEl = document.getElementById("form" + suffix + "-price-disc");
      if (oldEl) oldEl.textContent = "Redovna cijena: " + de + " " + m;
      if (newEl) newEl.textContent = por + " " + m;
      if (discEl) discEl.textContent = "🔥 UŠTEDA " + disc + "% 🔥";
    });

    // Textos e país nos forms 2 e 3
    [2, 3].forEach(function (n) {
      setText("form-badge-" + n, o.textos.badgeOferta);
      setText("form-title-" + n, o.textos.tituloForm);
      setText("form-subtitle-" + n, o.textos.subtituloForm);
      setText("cta-text-" + n, o.textos.botaoCta);
      setText("payment-info-" + n, o.textos.pagamento);
      setAttr("name_f" + n, "placeholder", o.textos.placeholderNome);
      setAttr("phone_f" + n, "placeholder", o.textos.placeholderTelefone);
      setText("ddi-f" + n, o.geo.paisDDI);
      const opt = document.getElementById("country-f" + n);
      if (opt) opt.textContent = o.geo.paisNome + " (" + o.geo.paisDDI + ")";
      const optVal = document.getElementById("country-f" + n);
      if (optVal) optVal.value = o.geo.paisCodigo;
    });

    // Bloco final "form-badge-2" reaproveitado do CTA final (compat com estrutura antiga)
    setText("form-badge-cta-final", o.textos.badgeOferta);
    setText("form-title-cta-final", o.textos.tituloForm);

    // Order section
    const orderOld = document.getElementById("order-price-old");
    const orderNew = document.getElementById("order-price-new");
    if (orderOld) orderOld.textContent = de + " " + m;
    if (orderNew) orderNew.textContent = por + " " + m;

    // Imagens do produto
    document.querySelectorAll(".product-img-front, .product-pulse[data-role='front']").forEach(function (img) {
      img.src = o.produto.imagemFront;
      img.alt = o.produto.nome;
    });
    document.querySelectorAll(".product-img-back").forEach(function (img) {
      img.src = o.produto.imagemBack;
      img.alt = o.produto.nome + " - poleđina";
    });

    // Nome do produto em todo lugar marcado
    document.querySelectorAll(".produto-nome").forEach(function (el) {
      el.textContent = o.produto.nome;
    });

    document.getElementById("ano-atual") &&
      (document.getElementById("ano-atual").textContent = new Date().getFullYear());
  });
})();
