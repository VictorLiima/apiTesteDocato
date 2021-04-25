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
        data.push({ botao: btContratar[i].textContent });
      }
      return data;
    });

    let b = 0;

    let btSaibaMais = await page.evaluate(() => {
      let botaoSaibaMais = document.getElementsByClassName("botao-saiba-mais");
      return botaoSaibaMais[0].textContent;
    });

    console.log(btSaibaMais);

    for (let i = 0; i < btCont.length; i++) {
      if (btCont[i].botao.indexOf("Contratar") !== -1) {
        produtos[b].botao = btCont[i].botao;
        b += 1;
      } else {
        produtos[b].botao = btSaibaMais;
        b += 1;
      }
    }

    await browser.close();

    res.send(produtos);
  }
}

module.exports = docatoProdutos;
