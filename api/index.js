// Vercel Serverless Function — substitui o api.php
// Recebe o POST do formulário, envia para TerraLeads e redireciona para success.html

const https = require("https");
const http = require("http");
const { URL } = require("url");

const API_KEY   = "c66289394c2a6e8515c8e8b382fba719";
const OFFER_ID  = 13926;
const USER_ID   = 75329;
const API_DOMAIN = "https://t-api.org";
const STREAM_ID = "410233";

function sha1(str) {
  const crypto = require("crypto");
  return crypto.createHash("sha1").update(str).digest("hex");
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const obj = {};
      for (const [k, v] of params.entries()) obj[k] = v;
      resolve(obj);
    });
    req.on("error", reject);
  });
}

function terraRequest(payload) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify({ user_id: USER_ID, data: payload });
    const checkSum = sha1(jsonData);
    const apiUrl = new URL(
      `/api/lead/create?check_sum=${checkSum}`,
      API_DOMAIN
    );

    const options = {
      hostname: apiUrl.hostname,
      path: apiUrl.pathname + apiUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonData),
      },
    };

    const lib = apiUrl.protocol === "https:" ? https : http;
    const req = lib.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          reject(new Error("JSON parse error: " + data));
        }
      });
    });
    req.on("error", reject);
    req.write(jsonData);
    req.end();
  });
}

function getIp(req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    ""
  );
}

module.exports = async (req, res) => {
  // Só aceita POST
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const post = await parseBody(req);

    // Monta a query string a partir do referer para pegar UTMs
    const referer = req.headers["referer"] || "";
    let query = {};
    try {
      const refUrl = new URL(referer);
      for (const [k, v] of refUrl.searchParams.entries()) query[k] = v;
    } catch {}

    const payload = {
      name:       post.name      || "",
      phone:      post.phone     || "",
      offer_id:   OFFER_ID,
      country:    post.country   || "BA",
      tz:         2,
      stream_id:  STREAM_ID,

      region:       post.region       || null,
      city:         post.city         || null,
      count:        post.count        || null,
      address:      post.address      || null,
      email:        post.email        || null,
      zip:          post.zip          || null,
      user_comment: post.user_comment || null,

      referer:    referer              || null,
      user_agent: req.headers["user-agent"] || null,
      ip:         getIp(req)          || null,

      utm_source:   query.utm_source   || post.utm_source   || null,
      utm_medium:   query.utm_medium   || post.utm_medium   || null,
      utm_campaign: query.utm_campaign || post.utm_campaign || null,
      utm_term:     query.utm_term     || post.utm_term     || null,
      utm_content:  query.utm_content  || post.utm_content  || null,

      sub_id:   query.sub_id   || post.sub_id   || null,
      sub_id_1: query.sub_id_1 || post.sub_id_1 || null,
      sub_id_2: query.sub_id_2 || post.sub_id_2 || null,
      sub_id_3: query.sub_id_3 || post.sub_id_3 || null,
      sub_id_4: query.sub_id_4 || post.sub_id_4 || null,
    };

    // Remove nulos
    Object.keys(payload).forEach(
      (k) => payload[k] === null && delete payload[k]
    );

    const result = await terraRequest(payload);

    if (result.status === 200 && result.body?.status === "ok") {
      const leadId = result.body?.data?.id || "";
      res.redirect(302, `/success.html?id=${leadId}`);
    } else {
      const errMsg = result.body?.error || "Unknown error from TerraLeads";
      res.status(502).send("Erro ao criar lead: " + errMsg);
    }
  } catch (err) {
    console.error("API error:", err);
    res.status(500).send("Erro interno: " + err.message);
  }
};
