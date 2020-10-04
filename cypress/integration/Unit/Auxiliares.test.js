import { estáContidoEm } from "../../../src/lib/Auxiliares";
import { TEXTO } from "../../../src/data/Constantes";

// Funções indiretas, usadas pelas funções principais


// describe("estáContidoEm()", () => {
//     context("Bloco horário está contido em outro bloco", () => {
//         it("Verdadeiro para horários iguais", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 5, fim: 6 };
//             let novo = { tipo: TEXTO.CHUVA, início: 5, fim: 6 };
//             expect(estáContidoEm(novo, existente)).to.be.true;
//             expect(estáContidoEm(existente, novo)).to.be.true;
//         })
//         it("Existente está contido no novo", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 5, fim: 6 };
//             let novo = { tipo: TEXTO.CHUVA, início: 1, fim: 10 };
//             expect(estáContidoEm(existente, novo)).to.be.true;
//         })
//         it("Novo está contido no existente", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 1, fim: 10 };
//             let novo = { tipo: TEXTO.CHUVA, início: 5, fim: 6 };
//             expect(estáContidoEm(novo, existente)).to.be.true;
//         })
//         it("Novo intercede o existente", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 5, fim: 10 };
//             let novo = { tipo: TEXTO.CHUVA, início: 4, fim: 6 };
//             expect(estáContidoEm(novo, existente)).to.be.false;
//         })
//         it("Novo extrapola o existente", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 5, fim: 10 };
//             let novo = { tipo: TEXTO.CHUVA, início: 6, fim: 12 };
//             expect(estáContidoEm(novo, existente)).to.be.false;
//         })
//         it("Existente intercede o novo", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 4, fim: 6 };
//             let novo = { tipo: TEXTO.CHUVA, início: 5, fim: 10 };
//             expect(estáContidoEm(existente, novo)).to.be.false;
//         })
//         it("Existente extrapola o novo", () => {
//             let existente = { tipo: TEXTO.CHUVA, início: 6, fim: 12 };
//             let novo = { tipo: TEXTO.CHUVA, início: 5, fim: 10 };
//             expect(estáContidoEm(existente, novo)).to.be.false;
//         })
//     })
// })


// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })