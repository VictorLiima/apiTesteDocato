const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const { get } = require("request");

class docatoProdutos {
  constructor() {}

  async getInfo(req, res, next) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://docato.com.br/produto/destaques");

    let produtos = await page.evaluate(() => {
      let data = [];
      let nomes = document.getElementsByClassName("h5 azul-escuro-docato");
      let descricoes = document.getElementsByClassName("h6 cinza-footer");
      for (let i = 0; i < nomes.length; i++) {
        data.push({
          nome: nomes[i].textContent.replace("\n", "").trim(),
          descricao: descricoes[i].textContent
            .replaceAll("\n", "")
            .replaceAll("  ", "")
            .trim(),
        });
      }
      return data;
    });

    let precos = await page.evaluate(() => {
      let data = [];
      let precos = document.getElementsByClassName(
        "col-md-2 col-12 my-auto text-center"
      );

      for (let i = 0; i < precos.length; i++) {
        data.push(precos[i].textContent);
      }
      return data;
    });

    let j = 0;

    for (let i = 0; i < precos.length; i++) {
      if (precos[i].indexOf("R$") !== -1) {
        produtos[j].preco = precos[i].replace("\n", "").trim();
        j += 1;
      }
    }

    let btCont = await page.evaluate(() => {
      let data = [];
      let btContratar = document.getElementsByClassName("botao-atividade");

      for (let i = 0; i < btContratar.length; i++) {
        data.push({
          botao: btContratar[i].textContent,
          link: btContratar[i].href,
        });
      }
      return data;
    });

    let b = 0;

    let btSaiba = await page.evaluate(() => {
      let data = [];
      let btSaibaMais = document.getElementsByClassName("botao-saiba-mais");
      data.push({
        botao: btSaibaMais[i].textContent,
        link: btSaibaMais[i].href,
      });
      return data;
    });

    for (let i = 0; i < btCont.length; i++) {
      if (btCont[i].botao.indexOf("Contratar") !== -1) {
        produtos[b].botao = btCont[i].botao;
        produtos[b].link = btCont[i].link;
        b += 1;
      } else {
        produtos[b].botao = btSaiba[0].botao;
        produtos[b].link = btSaiba[0].link;
      }
    }

    await browser.close();

    res.send(produtos);
  }
}

module.exports = docatoProdutos;
