import {
    processaInterval,
    subtraiInterval
} from "../../../src/lib/Interval";
import { TEXT } from "../../../src/data/Data";


// describe("processaInterval()", () => {
//     let morningAtivo = { active: true, start: 5, end: 12 };
//     let tardeAtivo = { active: true, start: 14, end: 20 };
//     let morningInactive = { active: false, start: 5, end: 12 };
//     let tardeInactive = { active: false, start: 14, end: 20 };

//     context("Morning e Afternoon actives", () => {
//         it("Nenhuma pausa de chuva", () => {
//             let chuva = [];
//             let resultado = [{ type: TEXT.LUNCH, start: 12, end: 14 }];
//             expect(processaInterval(chuva, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Uma pausa de chuva", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let resultado = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.LUNCH, start: 12, end: 14 }];
//             expect(processaInterval(chuva, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva dentro do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.RAIN, start: 11, end: 12 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 9, end: 10 },
//                 { type: TEXT.RAIN, start: 11, end: 12 },
//                 { type: TEXT.LUNCH, start: 12, end: 14 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva, uma além do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.RAIN, start: 11, end: 13 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 9, end: 10 },
//                 { type: TEXT.RAIN, start: 11, end: 12 },
//                 { type: TEXT.LUNCH, start: 12, end: 14 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Uma pausa de chuva por period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.RAIN, start: 15, end: 16 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 9, end: 10 },
//                 { type: TEXT.LUNCH, start: 12, end: 14 },
//                 { type: TEXT.RAIN, start: 15, end: 16 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })

//     context("Morning active", () => {
//         it("Nenhuma pausa de chuva", () => {
//             expect(processaInterval([], morningAtivo, tardeInactive)).to.deep.equal([]);
//         })
//         it("Uma pausa de chuva durante o period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let resultado = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             expect(processaInterval(chuva, morningAtivo, tardeInactive)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva durante o period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.RAIN, start: 11, end: 12 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 9, end: 10 },
//                 { type: TEXT.RAIN, start: 11, end: 12 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeInactive)).to.deep.equal(resultado);
//         })
//         it("Chuva começou antes do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 4, end: 9 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 4, end: 9 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeInactive)).to.deep.equal(resultado);
//         })
//         it("Chuva terminou depois do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 10, end: 15 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 10, end: 15 }
//             ];
//             expect(processaInterval(chuva, morningAtivo, tardeInactive)).to.deep.equal(resultado);
//         })
//     })

//     context("Afternoon active", () => {
//         it("Nenhuma pausa de chuva", () => {
//             expect(processaInterval([], morningInactive, tardeAtivo)).to.deep.equal([]);
//         })
//         it("Uma pausa de chuva durante o period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 15, end: 16 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 15, end: 16 }
//             ];
//             expect(processaInterval(chuva, morningInactive, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva durante o period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 15, end: 16 }, { type: TEXT.RAIN, start: 17, end: 18 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 15, end: 16 },
//                 { type: TEXT.RAIN, start: 17, end: 18 }
//             ];
//             expect(processaInterval(chuva, morningInactive, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Chuva começou antes do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 11, end: 15 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 11, end: 15 }
//             ];
//             expect(processaInterval(chuva, morningInactive, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Chuva terminou depois do period", () => {
//             let chuva = [{ type: TEXT.RAIN, start: 18, end: 22 }];
//             let resultado = [
//                 { type: TEXT.RAIN, start: 18, end: 22 }
//             ];
//             expect(processaInterval(chuva, morningInactive, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })
// })



// describe("subtraiInterval()", () => {
//     context("Subtrai os intervalos dentro do dia", () => {
//         it("Nenhum intervalo", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [];
//             let resultado = [{ start: 8, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Apenas intervalo do almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.LUNCH, start: 11, end: 14 }];
//             let resultado = [{ start: 8, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Apenas uma chuva", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 11, end: 14 }];
//             let resultado = [{ start: 8, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Almoço e uma chuva", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.LUNCH, start: 11, end: 14 }];
//             let resultado = [{ start: 8, end: 9 }, { start: 10, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Almoço e duas chuvas", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.LUNCH, start: 11, end: 14 }, { type: TEXT.RAIN, start: 15, end: 16 }];
//             let resultado = [{ start: 8, end: 9 }, { start: 10, end: 11 }, { start: 14, end: 15 }, { start: 16, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
//     context("Subtrai os intervalos intercedendo o dia", () => {
//         it("Chuva começando o dia, sem almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 5, end: 9 }];
//             let resultado = [{ start: 9, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva começando o dia, com almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 5, end: 10 }, { type: TEXT.LUNCH, start: 11, end: 14 }];
//             let resultado = [{ start: 10, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva terminando o dia, sem almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 15, end: 20 }];
//             let resultado = [{ start: 8, end: 15 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva terminando o dia, com almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.LUNCH, start: 11, end: 14 }, { type: TEXT.RAIN, start: 15, end: 20 }];
//             let resultado = [{ start: 8, end: 11 }, { start: 14, end: 15 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
//     context("Ignora os intervalos fora do horário do dia", () => {
//         it("Chuva antes do dia", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 5, end: 7 }];
//             let resultado = [{ start: 8, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva antes do dia, com almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 5, end: 7 }, { type: TEXT.LUNCH, start: 11, end: 14 }];
//             let resultado = [{ start: 8, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva além do dia, sem almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.RAIN, start: 18, end: 20 }];
//             let resultado = [{ start: 8, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva além do dia, com almoço", () => {
//             let dia = { start: 8, end: 17 };
//             let intervalos = [{ type: TEXT.LUNCH, start: 11, end: 14 }, { type: TEXT.RAIN, start: 18, end: 20 }];
//             let resultado = [{ start: 8, end: 11 }, { start: 14, end: 17 }];
//             expect(subtraiInterval(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
// })
