import {
    updateInspectionsPeriods,
    processPeriods
} from "../../../src/lib/Period";
import { TEXT } from "../../../src/data/Data";


// describe("updateInspectionsPeriods()", () => {
//     context("Identifica os periods da morning e da tarde.", () => {
//         let morningAtivo = { active: true, start: 8, end: 12 };
//         let tardeAtivo = { active: true, start: 13, end: 17 };
//         let morningInactive = { active: false, start: 8, end: 12 };
//         let tardeInactive = { active: false, start: 13, end: 17 };

//         it("Marca period da Morning", () => {
//             let momentos = [{ period: TEXT.MORNING, start: 9, end: 10 }];
//             let resultado = [{ period: TEXT.MORNING, start: 9, end: 10 }];
//             expect(updateInspectionsPeriods(momentos, morningAtivo, tardeInactive)).to.deep.equal(resultado);
//         })
//         it("Marca period da Afternoon", () => {
//             let momentos = [{ period: TEXT.AFTERNOON, start: 15, end: 17 }];
//             let resultado = [{ period: TEXT.AFTERNOON, start: 15, end: 17 }];
//             expect(updateInspectionsPeriods(momentos, morningInactive, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Marca periods da Morning e Afternoon", () => {
//             let momentos = [{ period: TEXT.MORNING, start: 9, end: 10 }, { period: TEXT.AFTERNOON, start: 15, end: 17 }];
//             let resultado = [{ period: TEXT.MORNING, start: 9, end: 10 }, { period: TEXT.AFTERNOON, start: 15, end: 17 }];
//             expect(updateInspectionsPeriods(momentos, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Marca vários periods da Morning e Afternoon", () => {
//             let momentos = [{ period: TEXT.MORNING, start: 9, end: 10 }, { period: TEXT.MORNING, start: 11, end: 12 }, { period: TEXT.AFTERNOON, start: 14, end: 15 }, { period: TEXT.MORNING, start: 16, end: 17 }];
//             let resultado = [{ period: TEXT.MORNING, start: 9, end: 10 }, { period: TEXT.MORNING, start: 11, end: 12 }, { period: TEXT.AFTERNOON, start: 14, end: 15 }, { period: TEXT.AFTERNOON, start: 16, end: 17 }];
//             expect(updateInspectionsPeriods(momentos, morningAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })
// })

// describe("processPeriods()", () => {
//     let morningAtivo = { active: true, start: 8, end: 12 };
//     let tardeAtivo = { active: true, start: 13, end: 17 };
//     let morningInactive = { active: false, start: 8, end: 12 };
//     let tardeInactive = { active: false, start: 13, end: 17 };

//     context("Faz todo o processamento de Periods", () => {
//         it("Morning e Afternoon", () => {
//             let resultado = [{ period: TEXT.MORNING, start: 8, end: 12 }, { period: TEXT.AFTERNOON, start: 13, end: 17 }];
//             expect(processPeriods(morningAtivo, tardeAtivo, [])).to.deep.equal(resultado);
//         })
//         it("Morning e Afternoon, uma chuva", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let resultado = [{ period: TEXT.MORNING, start: 8, end: 9 }, { period: TEXT.MORNING, start: 10, end: 12 }, { period: TEXT.AFTERNOON, start: 13, end: 17 }];
//             expect(processPeriods(morningAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//         it("Morning e Afternoon, duas chuvas", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 9, end: 10 }, { type: TEXT.RAIN, start: 14, end: 16 }];
//             let resultado = [{ period: TEXT.MORNING, start: 8, end: 9 }, { period: TEXT.MORNING, start: 10, end: 12 }, { period: TEXT.AFTERNOON, start: 13, end: 14 }, { period: TEXT.AFTERNOON, start: 16, end: 17 }];
//             expect(processPeriods(morningAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//         it(TEXT.MORNING, () => {
//             let resultado = [{ period: TEXT.MORNING, start: 8, end: 12 }];
//             expect(processPeriods(morningAtivo, tardeInactive, [])).to.deep.equal(resultado);
//         })
//         it("Morning, uma chuva", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 9, end: 10 }];
//             let resultado = [{ period: TEXT.MORNING, start: 8, end: 9 }, { period: TEXT.MORNING, start: 10, end: 12 }];
//             expect(processPeriods(morningAtivo, tardeInactive, chuvas)).to.deep.equal(resultado);
//         })
//         it(TEXT.AFTERNOON, () => {
//             let resultado = [{ period: TEXT.AFTERNOON, start: 13, end: 17 }];
//             expect(processPeriods(morningInactive, tardeAtivo, [])).to.deep.equal(resultado);
//         })
//         it("Afternoon, uma chuva", () => {
//             let chuvas = [{ type: TEXT.RAIN, start: 15, end: 16 }];
//             let resultado = [{ period: TEXT.AFTERNOON, start: 13, end: 15 }, { period: TEXT.AFTERNOON, start: 16, end: 17 }];
//             expect(processPeriods(morningInactive, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//     })
// })
