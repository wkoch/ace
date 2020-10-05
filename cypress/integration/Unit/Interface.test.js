import {
    addRain,
} from "../../../src/lib/Interface";
import { TEXT } from "../../../src/data/Data";

// describe("addRain()", () => {
//     context("Adiciona um bloco de chuva a lista", () => {
//         it("Primeira chuva", () => {
//             let novo = { type: TEXT.RAIN, start: 8, end: 9 };
//             let resultado = [novo];
//             expect(addRain([], novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas, sem interseção", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 8, end: 9 }];
//             let novo = { type: TEXT.RAIN, start: 10, end: 11 };
//             let resultado = [{ type: TEXT.RAIN, start: 8, end: 9 }, { type: TEXT.RAIN, start: 10, end: 11 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas, com interseção, novo contido em chuva existente", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 8, end: 11 }];
//             let novo = { type: TEXT.RAIN, start: 9, end: 10 };
//             let resultado = [{ type: TEXT.RAIN, start: 8, end: 11 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas, com interseção, chuva contido no novo", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let novo = { type: TEXT.RAIN, start: 8, end: 11 };
//             let resultado = [{ type: TEXT.RAIN, start: 8, end: 11 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas, com interseção, começa dentro, termina depois", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 8, end: 11 }];
//             let novo = { type: TEXT.RAIN, start: 9, end: 12 };
//             let resultado = [{ type: TEXT.RAIN, start: 8, end: 12 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas, com interseção, começa antes, termina dentro", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 8, end: 11 }];
//             let novo = { type: TEXT.RAIN, start: 7, end: 10 };
//             let resultado = [{ type: TEXT.RAIN, start: 7, end: 11 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//         it("Duas chuvas sequenciais dentro do period", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let novo = { type: TEXT.RAIN, start: 10, end: 11 };
//             let resultado = [{ type: TEXT.RAIN, start: 9, end: 11 }];
//             expect(addRain(chuvas, novo)).to.deep.equal(resultado);
//         })
//     })
// })
