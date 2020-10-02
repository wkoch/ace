import {
    identificaPeriodos,
    processaPeriodos
} from "../../src/lib/Periodos";


describe("identificaPeriodos()", () => {
    context("Identifica os períodos da manhã e da tarde.", () => {
        let manhaAtivo = { ativo: true, inicio: 8, fim: 12 };
        let tardeAtivo = { ativo: true, inicio: 13, fim: 17 };
        let manhaInativo = { ativo: false, inicio: 8, fim: 12 };
        let tardeInativo = { ativo: false, inicio: 13, fim: 17 };

        it("Marca período da Manhã", () => {
            let momentos = [{ periodo: "Manhã", inicio: 9, fim: 10 }];
            let resultado = [{ periodo: "Manhã", inicio: 9, fim: 10 }];
            expect(identificaPeriodos(momentos, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
        it("Marca período da Tarde", () => {
            let momentos = [{ periodo: "Tarde", inicio: 15, fim: 17 }];
            let resultado = [{ periodo: "Tarde", inicio: 15, fim: 17 }];
            expect(identificaPeriodos(momentos, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Marca períodos da Manhã e Tarde", () => {
            let momentos = [{ periodo: "Manhã", inicio: 9, fim: 10 }, { periodo: "Tarde", inicio: 15, fim: 17 }];
            let resultado = [{ periodo: "Manhã", inicio: 9, fim: 10 }, { periodo: "Tarde", inicio: 15, fim: 17 }];
            expect(identificaPeriodos(momentos, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Marca vários períodos da Manhã e Tarde", () => {
            let momentos = [{ periodo: "Manhã", inicio: 9, fim: 10 }, { periodo: "Manhã", inicio: 11, fim: 12 }, { periodo: "Tarde", inicio: 14, fim: 15 }, { periodo: "Manhã", inicio: 16, fim: 17 }];
            let resultado = [{ periodo: "Manhã", inicio: 9, fim: 10 }, { periodo: "Manhã", inicio: 11, fim: 12 }, { periodo: "Tarde", inicio: 14, fim: 15 }, { periodo: "Tarde", inicio: 16, fim: 17 }];
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
            let resultado = [{ periodo: 'Manhã', inicio: 8, fim: 12 }, { periodo: 'Tarde', inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, [])).to.deep.equal(resultado);
        })
        it("Manhã e Tarde, uma chuva", () => {
            let chuvas = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            let resultado = [{ periodo: 'Manhã', inicio: 8, fim: 9 }, { periodo: 'Manhã', inicio: 10, fim: 12 }, { periodo: 'Tarde', inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
        it("Manhã e Tarde, duas chuvas", () => {
            let chuvas = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "chuva", inicio: 14, fim: 16 }];
            let resultado = [{ periodo: 'Manhã', inicio: 8, fim: 9 }, { periodo: 'Manhã', inicio: 10, fim: 12 }, { periodo: 'Tarde', inicio: 13, fim: 14 }, { periodo: 'Tarde', inicio: 16, fim: 17 }];
            expect(processaPeriodos(manhaAtivo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
        it("Manhã", () => {
            let resultado = [{ periodo: 'Manhã', inicio: 8, fim: 12 }];
            expect(processaPeriodos(manhaAtivo, tardeInativo, [])).to.deep.equal(resultado);
        })
        it("Manhã, uma chuva", () => {
            let chuvas = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            let resultado = [{ periodo: 'Manhã', inicio: 8, fim: 9 }, { periodo: 'Manhã', inicio: 10, fim: 12 }];
            expect(processaPeriodos(manhaAtivo, tardeInativo, chuvas)).to.deep.equal(resultado);
        })
        it("Tarde", () => {
            let resultado = [{ periodo: 'Tarde', inicio: 13, fim: 17 }];
            expect(processaPeriodos(manhaInativo, tardeAtivo, [])).to.deep.equal(resultado);
        })
        it("Tarde, uma chuva", () => {
            let chuvas = [{ tipo: "chuva", inicio: 15, fim: 16 }];
            let resultado = [{ periodo: 'Tarde', inicio: 13, fim: 15 }, { periodo: 'Tarde', inicio: 16, fim: 17 }];
            expect(processaPeriodos(manhaInativo, tardeAtivo, chuvas)).to.deep.equal(resultado);
        })
    })
})
