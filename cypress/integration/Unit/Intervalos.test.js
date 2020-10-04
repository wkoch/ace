import {
    processaIntervalos,
    subtraiIntervalos
} from "../../../src/lib/Intervalos";
import { TEXTO } from "../../../src/data/Constantes";


// describe("processaIntervalos()", () => {
//     let manhãAtivo = { ativo: true, início: 5, fim: 12 };
//     let tardeAtivo = { ativo: true, início: 14, fim: 20 };
//     let manhãInativo = { ativo: false, início: 5, fim: 12 };
//     let tardeInativo = { ativo: false, início: 14, fim: 20 };

//     context("Manhã e Tarde ativos", () => {
//         it("Nenhuma pausa de chuva", () => {
//             let chuva = [];
//             let resultado = [{ tipo: TEXTO.ALMOÇO, início: 12, fim: 14 }];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Uma pausa de chuva", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }];
//             let resultado = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.ALMOÇO, início: 12, fim: 14 }];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva dentro do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.CHUVA, início: 11, fim: 12 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 9, fim: 10 },
//                 { tipo: TEXTO.CHUVA, início: 11, fim: 12 },
//                 { tipo: TEXTO.ALMOÇO, início: 12, fim: 14 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva, uma além do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.CHUVA, início: 11, fim: 13 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 9, fim: 10 },
//                 { tipo: TEXTO.CHUVA, início: 11, fim: 12 },
//                 { tipo: TEXTO.ALMOÇO, início: 12, fim: 14 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Uma pausa de chuva por período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.CHUVA, início: 15, fim: 16 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 9, fim: 10 },
//                 { tipo: TEXTO.ALMOÇO, início: 12, fim: 14 },
//                 { tipo: TEXTO.CHUVA, início: 15, fim: 16 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })

//     context("Manhã ativo", () => {
//         it("Nenhuma pausa de chuva", () => {
//             expect(processaIntervalos([], manhãAtivo, tardeInativo)).to.deep.equal([]);
//         })
//         it("Uma pausa de chuva durante o período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }];
//             let resultado = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeInativo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva durante o período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.CHUVA, início: 11, fim: 12 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 9, fim: 10 },
//                 { tipo: TEXTO.CHUVA, início: 11, fim: 12 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeInativo)).to.deep.equal(resultado);
//         })
//         it("Chuva começou antes do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 4, fim: 9 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 4, fim: 9 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeInativo)).to.deep.equal(resultado);
//         })
//         it("Chuva terminou depois do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 10, fim: 15 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 10, fim: 15 }
//             ];
//             expect(processaIntervalos(chuva, manhãAtivo, tardeInativo)).to.deep.equal(resultado);
//         })
//     })

//     context("Tarde ativo", () => {
//         it("Nenhuma pausa de chuva", () => {
//             expect(processaIntervalos([], manhãInativo, tardeAtivo)).to.deep.equal([]);
//         })
//         it("Uma pausa de chuva durante o período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 15, fim: 16 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 15, fim: 16 }
//             ];
//             expect(processaIntervalos(chuva, manhãInativo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Duas pausas de chuva durante o período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 15, fim: 16 }, { tipo: TEXTO.CHUVA, início: 17, fim: 18 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 15, fim: 16 },
//                 { tipo: TEXTO.CHUVA, início: 17, fim: 18 }
//             ];
//             expect(processaIntervalos(chuva, manhãInativo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Chuva começou antes do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 11, fim: 15 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 11, fim: 15 }
//             ];
//             expect(processaIntervalos(chuva, manhãInativo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Chuva terminou depois do período", () => {
//             let chuva = [{ tipo: TEXTO.CHUVA, início: 18, fim: 22 }];
//             let resultado = [
//                 { tipo: TEXTO.CHUVA, início: 18, fim: 22 }
//             ];
//             expect(processaIntervalos(chuva, manhãInativo, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })
// })



// describe("subtraiIntervalos()", () => {
//     context("Subtrai os intervalos dentro do dia", () => {
//         it("Nenhum intervalo", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [];
//             let resultado = [{ início: 8, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Apenas intervalo do almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }];
//             let resultado = [{ início: 8, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Apenas uma chuva", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 11, fim: 14 }];
//             let resultado = [{ início: 8, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Almoço e uma chuva", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }];
//             let resultado = [{ início: 8, fim: 9 }, { início: 10, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Almoço e duas chuvas", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }, { tipo: TEXTO.CHUVA, início: 15, fim: 16 }];
//             let resultado = [{ início: 8, fim: 9 }, { início: 10, fim: 11 }, { início: 14, fim: 15 }, { início: 16, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
//     context("Subtrai os intervalos intercedendo o dia", () => {
//         it("Chuva começando o dia, sem almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 5, fim: 9 }];
//             let resultado = [{ início: 9, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva começando o dia, com almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 5, fim: 10 }, { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }];
//             let resultado = [{ início: 10, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva terminando o dia, sem almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 15, fim: 20 }];
//             let resultado = [{ início: 8, fim: 15 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva terminando o dia, com almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }, { tipo: TEXTO.CHUVA, início: 15, fim: 20 }];
//             let resultado = [{ início: 8, fim: 11 }, { início: 14, fim: 15 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
//     context("Ignora os intervalos fora do horário do dia", () => {
//         it("Chuva antes do dia", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 5, fim: 7 }];
//             let resultado = [{ início: 8, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva antes do dia, com almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 5, fim: 7 }, { tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }];
//             let resultado = [{ início: 8, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva além do dia, sem almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.CHUVA, início: 18, fim: 20 }];
//             let resultado = [{ início: 8, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//         it("Chuva além do dia, com almoço", () => {
//             let dia = { início: 8, fim: 17 };
//             let intervalos = [{ tipo: TEXTO.ALMOÇO, início: 11, fim: 14 }, { tipo: TEXTO.CHUVA, início: 18, fim: 20 }];
//             let resultado = [{ início: 8, fim: 11 }, { início: 14, fim: 17 }];
//             expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
//         })
//     })
// })
