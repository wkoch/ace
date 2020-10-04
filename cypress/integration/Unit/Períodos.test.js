import {
    identificaPeríodos,
    processaPeríodos
} from "../../../src/lib/Períodos";
import { TEXTO } from "../../../src/data/Constantes";


// describe("identificaPeríodos()", () => {
//     context("Identifica os períodos da manhã e da tarde.", () => {
//         let manhãAtivo = { ativo: true, início: 8, fim: 12 };
//         let tardeAtivo = { ativo: true, início: 13, fim: 17 };
//         let manhãInativo = { ativo: false, início: 8, fim: 12 };
//         let tardeInativo = { ativo: false, início: 13, fim: 17 };

//         it("Marca período da Manhã", () => {
//             let momentos = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }];
//             expect(identificaPeríodos(momentos, manhãAtivo, tardeInativo)).to.deep.equal(resultado);
//         })
//         it("Marca período da Tarde", () => {
//             let momentos = [{ período: TEXTO.TARDE, início: 15, fim: 17 }];
//             let resultado = [{ período: TEXTO.TARDE, início: 15, fim: 17 }];
//             expect(identificaPeríodos(momentos, manhãInativo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Marca períodos da Manhã e Tarde", () => {
//             let momentos = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }, { período: TEXTO.TARDE, início: 15, fim: 17 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }, { período: TEXTO.TARDE, início: 15, fim: 17 }];
//             expect(identificaPeríodos(momentos, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//         it("Marca vários períodos da Manhã e Tarde", () => {
//             let momentos = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }, { período: TEXTO.MANHÃ, início: 11, fim: 12 }, { período: TEXTO.TARDE, início: 14, fim: 15 }, { período: TEXTO.MANHÃ, início: 16, fim: 17 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 9, fim: 10 }, { período: TEXTO.MANHÃ, início: 11, fim: 12 }, { período: TEXTO.TARDE, início: 14, fim: 15 }, { período: TEXTO.TARDE, início: 16, fim: 17 }];
//             expect(identificaPeríodos(momentos, manhãAtivo, tardeAtivo)).to.deep.equal(resultado);
//         })
//     })
// })

// describe("processaPeríodos()", () => {
//     let manhãAtivo = { ativo: true, início: 8, fim: 12 };
//     let tardeAtivo = { ativo: true, início: 13, fim: 17 };
//     let manhãInativo = { ativo: false, início: 8, fim: 12 };
//     let tardeInativo = { ativo: false, início: 13, fim: 17 };

//     context("Faz todo o processamento de Períodos", () => {
//         it("Manhã e Tarde", () => {
//             let resultado = [{ período: TEXTO.MANHÃ, início: 8, fim: 12 }, { período: TEXTO.TARDE, início: 13, fim: 17 }];
//             expect(processaPeríodos(manhãAtivo, tardeAtivo, [])).to.deep.equal(resultado);
//         })
//         it("Manhã e Tarde, uma chuva", () => {
//             let chuvas = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 8, fim: 9 }, { período: TEXTO.MANHÃ, início: 10, fim: 12 }, { período: TEXTO.TARDE, início: 13, fim: 17 }];
//             expect(processaPeríodos(manhãAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//         it("Manhã e Tarde, duas chuvas", () => {
//             let chuvas = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }, { tipo: TEXTO.CHUVA, início: 14, fim: 16 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 8, fim: 9 }, { período: TEXTO.MANHÃ, início: 10, fim: 12 }, { período: TEXTO.TARDE, início: 13, fim: 14 }, { período: TEXTO.TARDE, início: 16, fim: 17 }];
//             expect(processaPeríodos(manhãAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//         it(TEXTO.MANHÃ, () => {
//             let resultado = [{ período: TEXTO.MANHÃ, início: 8, fim: 12 }];
//             expect(processaPeríodos(manhãAtivo, tardeInativo, [])).to.deep.equal(resultado);
//         })
//         it("Manhã, uma chuva", () => {
//             let chuvas = [{ tipo: TEXTO.CHUVA, início: 9, fim: 10 }];
//             let resultado = [{ período: TEXTO.MANHÃ, início: 8, fim: 9 }, { período: TEXTO.MANHÃ, início: 10, fim: 12 }];
//             expect(processaPeríodos(manhãAtivo, tardeInativo, chuvas)).to.deep.equal(resultado);
//         })
//         it(TEXTO.TARDE, () => {
//             let resultado = [{ período: TEXTO.TARDE, início: 13, fim: 17 }];
//             expect(processaPeríodos(manhãInativo, tardeAtivo, [])).to.deep.equal(resultado);
//         })
//         it("Tarde, uma chuva", () => {
//             let chuvas = [{ tipo: TEXTO.CHUVA, início: 15, fim: 16 }];
//             let resultado = [{ período: TEXTO.TARDE, início: 13, fim: 15 }, { período: TEXTO.TARDE, início: 16, fim: 17 }];
//             expect(processaPeríodos(manhãInativo, tardeAtivo, chuvas)).to.deep.equal(resultado);
//         })
//     })
// })
