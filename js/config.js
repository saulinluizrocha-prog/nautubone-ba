/* ============================================
   CONFIG DA OFERTA — Nautubone, Bósnia e Herzegovina (BA)
   ============================================ */

const OFFER_CONFIG = {

  produto: {
    nome: "Nautubone",
    imagemFront: "img/nautubone_front.webp",
    imagemBack: "img/nautubone_back.webp",
  },

  oferta: {
    moeda: "KM",
    precoDe: 60,
    precoPor: 30,
    percentualDesconto: 50,
  },

  geo: {
    paisCodigo: "BA",
    paisNome: "Bosna i Hercegovina",
    paisDDI: "+387",
    idioma: "bs",
  },

  // TerraLeads api.php - POST tradicional, sem fetch.
  // O próprio api.php redireciona pra success.html no final.
  form: {
    actionUrl: "api.php",
    method: "post",
  },

  trackingParams: [
    "gclid",
    "sub_id",
    "sub_id_1",
    "sub_id_2",
    "sub_id_3",
    "sub_id_4",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ],

  textos: {
    badgeOferta: "OGRANIČENA PONUDA",
    tituloForm: "Naručite Nautubone sada!",
    subtituloForm: "Popunite podatke i osigurajte svoju sniženu cijenu",
    labelPais: "Država",
    labelNome: "Vaše ime i prezime:",
    placeholderNome: "Ime i prezime",
    labelTelefone: "Broj telefona:",
    placeholderTelefone: "61 123 456",
    ajudaTelefone: "Naš operater će nazvati radi potvrde narudžbe.",
    botaoCta: "🛒 Naručite odmah",
    pagamento: "Plaćanje pri dostavi - platite kada primite paket",
    erroValidacao: "Molimo ispravno unesite ime i broj telefona.",
    enviando: "Slanje...",
  },
};
