/**
 * @typedef { import("../../../src/lib/Type").Inspections } Inspections
 * @typedef { import("../../../src/lib/Type").Interval } Interval
 * @typedef { import("../../../src/lib/Type").Reports } Reports
 */

import { TEXT } from "../../../src/data/Data";

import {
    makeReport, inspectionIcon
} from "../../../src/lib/Inspection";

/** @type {Inspections} */
let vistorias = [
    { id: 2, period: TEXT.AFTERNOON, type: TEXT.NORMAL, start: 14, end: 15 },
    { id: 0, period: TEXT.MORNING, type: TEXT.NORMAL, start: 10, end: 11 },
    { id: 1, period: TEXT.MORNING, type: TEXT.CLOSED, start: 8, end: 9 }
];
/** @type {Inspections} */
let vistoriasOrdenada = [
    { id: 1, period: TEXT.MORNING, type: TEXT.CLOSED, start: 8, end: 9 },
    { id: 0, period: TEXT.MORNING, type: TEXT.NORMAL, start: 10, end: 11 },
    { id: 2, period: TEXT.AFTERNOON, type: TEXT.NORMAL, start: 14, end: 15 }
];

/** @type {Interval} */
let intervalos = [
    { type: TEXT.RAIN, start: 15, end: 17 },
    { type: TEXT.LUNCH, start: 11, end: 14 }
];
/** @type {Interval} */
let intervalosOrdenada = [
    { type: TEXT.LUNCH, start: 11, end: 14 },
    { type: TEXT.RAIN, start: 15, end: 17 }
];

/** @type {Reports} */
let relatório = [
    { id: 1, period: TEXT.MORNING, type: TEXT.CLOSED, start: 8, end: 9 },
    { id: 0, period: TEXT.MORNING, type: TEXT.NORMAL, start: 10, end: 11 },
    { type: TEXT.LUNCH, start: 11, end: 14 },
    { id: 2, period: TEXT.AFTERNOON, type: TEXT.NORMAL, start: 14, end: 15 },
    { type: TEXT.RAIN, start: 15, end: 17 }
];

describe("makeReport()", () => {
    context("Retorna uma lista pronta para impressão na tela", () => {
        it("Retorna uma lista vazia quando as fontes estiverem vazias", () => {
            expect(makeReport([], [])).to.deep.equal([]);
        });
        it("Retorna Inspections quando não houver intervalos", () => {
            expect(makeReport(vistorias, [])).to.deep.equal(vistoriasOrdenada);
        });
        it("Retorna Interval quando não houver vistorias", () => {
            expect(makeReport([], intervalos)).to.deep.equal(intervalosOrdenada);
        });
        it("Retorna a união ordenada de Inspections e Interval quando houver ambos", () => {
            expect(makeReport(vistorias, intervalos)).to.deep.equal(relatório);
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