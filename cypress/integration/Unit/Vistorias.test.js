/**
 * @typedef { import("../../../src/lib/Tipos").Vistorias } Vistorias
 * @typedef { import("../../../src/lib/Tipos").Intervalos } Intervalos
 * @typedef { import("../../../src/lib/Tipos").Relatórios } Relatórios
 */

import { TEXTO } from "../../../src/data/Constantes";

import {
    geraRelatório
} from "../../../src/lib/Vistorias";

/** @type {Vistorias} */
let vistorias = [
    { id: 2, período: TEXTO.TARDE, tipo: TEXTO.NORMAL, início: 14, fim: 15 },
    { id: 0, período: TEXTO.MANHÃ, tipo: TEXTO.NORMAL, início: 10, fim: 11 },
    { id: 1, período: TEXTO.MANHÃ, tipo: TEXTO.FECHADA, início: 8, fim: 9 }
];
/** @type {Vistorias} */
let vistoriasOrdenada = [
    { id: 1, período: TEXTO.MANHÃ, tipo: TEXTO.FECHADA, início: 8, fim: 9 },
    { id: 0, período: TEXTO.MANHÃ, tipo: TEXTO.NORMAL, início: 10, fim: 11 },
    { id: 2, período: TEXTO.TARDE, tipo: TEXTO.NORMAL, início: 14, fim: 15 }
];

/** @type {Intervalos} */
let intervalos = [
    { tipo: TEXTO.CHUVA, início: 15, fim: 17 },
    { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }
];
/** @type {Intervalos} */
let intervalosOrdenada = [
    { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 },
    { tipo: TEXTO.CHUVA, início: 15, fim: 17 }
];

/** @type {Relatórios} */
let relatório = [
    { id: 1, período: TEXTO.MANHÃ, tipo: TEXTO.FECHADA, início: 8, fim: 9 },
    { id: 0, período: TEXTO.MANHÃ, tipo: TEXTO.NORMAL, início: 10, fim: 11 },
    { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 },
    { id: 2, período: TEXTO.TARDE, tipo: TEXTO.NORMAL, início: 14, fim: 15 },
    { tipo: TEXTO.CHUVA, início: 15, fim: 17 }
];

describe("geraRelatório()", () => {
    context("Retorna uma lista pronta para impressão na tela", () => {
        it("Retorna uma lista vazia quando as fontes estiverem vazias", () => {
            expect(geraRelatório([], [])).to.deep.equal([]);
        });
        it("Retorna Vistorias quando não houver intervalos", () => {
            expect(geraRelatório(vistorias, [])).to.deep.equal(vistoriasOrdenada);
        });
        it("Retorna Intervalos quando não houver vistorias", () => {
            expect(geraRelatório([], intervalos)).to.deep.equal(intervalosOrdenada);
        });
        it("Retorna a união ordenada de Vistorias e Intervalos quando houver ambos", () => {
            expect(geraRelatório(vistorias, intervalos)).to.deep.equal(relatório);
        });
    });
});

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         });
//     });
// });

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         });
//     });
// });

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         });
//     });
// });