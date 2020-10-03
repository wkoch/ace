import {
    identificaPeriodos,
    processaPeriodos
} from "../../src/lib/Periodos";
import { TEXTO } from "../../src/data/Constantes";


describe("identificaPeriodos()", () => {
    context("Identifica os períodos da manhã e da tarde.", () => {
        let manhaAtivo = { ativo: true, inicio: 8, fim: 12 };
        let tardeAtivo = { ativo: true, inicio: 13, fim: 17 };
        let manhaInativo = { ativo: false, inicio: 8, fim: 12 };
        let tardeInativo = { ativo: false, inicio: 13, fim: 17 };

        it("Marca período da Manhã", () => {
            let momentos = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }];
            expect(identificaPeriodos(momentos, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
        it("Marca período da Tarde", () => {
            let momentos = [{ periodo: TEXTO.TARDE, inicio: 15, fim: 17 }];
            let resultado = [{ periodo: TEXTO.TARDE, inicio: 15, fim: 17 }];
            expect(identificaPeriodos(momentos, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Marca períodos da Manhã e Tarde", () => {
            let momentos = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }, { periodo: TEXTO.TARDE, inicio: 15, fim: 17 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }, { periodo: TEXTO.TARDE, inicio: 15, fim: 17 }];
            expect(identificaPeriodos(momentos, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Marca vários períodos da Manhã e Tarde", () => {
            let momentos = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }, { periodo: TEXTO.MANHÃ, inicio: 11, fim: 12 }, { periodo: TEXTO.TARDE, inicio: 14, fim: 15 }, { periodo: TEXTO.MANHÃ, inicio: 16, fim: 17 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 9, fim: 10 }, { periodo: TEXTO.MANHÃ, inicio: 11, fim: 12 }, { periodo: TEXTO.TARDE, inicio: 14, fim: 15 }, { periodo: TEXTO.TARDE, inicio: 16, fim: 17 }];
            expect(identificaPeriodos(momentos, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
    })
})

describe("processaPeriodos()", () => {
    let manhaAtivo = { ativo: true, inicio: 8, fim: 12 };
    let tardeAtivo = { ativo: true, inicio: 13, fim: 17 };
    let manhaInativo = { ativo: false, inicio: 8, fim: 12 };
    let tardeInativo = { ativo: false, inicio: 13, fim: 17 };

    context("Faz todo o processamento de Períodos", () => {
        it("Manhã e Tarde", () => {
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 8, fim: 12 }, { periodo: TEXTO.TARDE, inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, [])).to.deep.equal(resultado);
        })
        it("Manhã e Tarde, uma chuva", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 10 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 8, fim: 9 }, { periodo: TEXTO.MANHÃ, inicio: 10, fim: 12 }, { periodo: TEXTO.TARDE, inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
        it("Manhã e Tarde, duas chuvas", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 10 }, { tipo: TEXTO.CHUVA, inicio: 14, fim: 16 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 8, fim: 9 }, { periodo: TEXTO.MANHÃ, inicio: 10, fim: 12 }, { periodo: TEXTO.TARDE, inicio: 13, fim: 14 }, { periodo: TEXTO.TARDE, inicio: 16, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
        it(TEXTO.MANHÃ, () => {
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 8, fim: 12 }];
            expect(processaPeriodos(manhaAtivo, tardeInativo, [])).to.deep.equal(resultado);
        })
        it("Manhã, uma chuva", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 10 }];
            let resultado = [{ periodo: TEXTO.MANHÃ, inicio: 8, fim: 9 }, { periodo: TEXTO.MANHÃ, inicio: 10, fim: 12 }];
            expect(processaPeriodos(manhaAtivo, tardeInativo, chuvas)).to.deep.equal(resultado);
        })
        it(TEXTO.TARDE, () => {
            let resultado = [{ periodo: TEXTO.TARDE, inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaInativo, tardeAtivo, [])).to.deep.equal(resultado);
        })
        it("Tarde, uma chuva", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 15, fim: 16 }];
            let resultado = [{ periodo: TEXTO.TARDE, inicio: 13, fim: 15 }, { periodo: TEXTO.TARDE, inicio: 16, fim: 17 }];
            expect(processaPeriodos(manhaInativo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
    })
})
