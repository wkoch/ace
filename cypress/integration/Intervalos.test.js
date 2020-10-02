import {
    processaIntervalos,
    subtraiIntervalos
} from "../../src/lib/Intervalos";


describe("processaIntervalos()", () => {
    let manhaAtivo = { ativo: true, inicio: 5, fim: 12 };
    let tardeAtivo = { ativo: true, inicio: 14, fim: 20 };
    let manhaInativo = { ativo: false, inicio: 5, fim: 12 };
    let tardeInativo = { ativo: false, inicio: 14, fim: 20 };

    context("Manhã e Tarde ativos", () => {
        it("Nenhuma pausa de chuva", () => {
            let chuva = [];
            let resultado = [{ tipo: "almoço", inicio: 12, fim: 14 }];
            expect(processaIntervalos(chuva, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Uma pausa de chuva", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            let resultado = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "almoço", inicio: 12, fim: 14 }];
            expect(processaIntervalos(chuva, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Duas pausas de chuva dentro do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "chuva", inicio: 11, fim: 12 }];
            let resultado = [
                { tipo: "chuva", inicio: 9, fim: 10 },
                { tipo: "chuva", inicio: 11, fim: 12 },
                { tipo: "almoço", inicio: 12, fim: 14 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Duas pausas de chuva, uma além do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "chuva", inicio: 11, fim: 13 }];
            let resultado = [
                { tipo: "chuva", inicio: 9, fim: 10 },
                { tipo: "chuva", inicio: 11, fim: 12 },
                { tipo: "almoço", inicio: 12, fim: 14 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Uma pausa de chuva por período", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "chuva", inicio: 15, fim: 16 }];
            let resultado = [
                { tipo: "chuva", inicio: 9, fim: 10 },
                { tipo: "almoço", inicio: 12, fim: 14 },
                { tipo: "chuva", inicio: 15, fim: 16 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeAtivo)).to.deep.equal(resultado);
        })
    })

    context("Manhã ativo", () => {
        it("Nenhuma pausa de chuva", () => {
            expect(processaIntervalos([], manhaAtivo, tardeInativo)).to.deep.equal([]);
        })
        it("Uma pausa de chuva durante o período", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            let resultado = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            expect(processaIntervalos(chuva, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
        it("Duas pausas de chuva durante o período", () => {
            let chuva = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "chuva", inicio: 11, fim: 12 }];
            let resultado = [
                { tipo: "chuva", inicio: 9, fim: 10 },
                { tipo: "chuva", inicio: 11, fim: 12 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
        it("Chuva começou antes do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 4, fim: 9 }];
            let resultado = [
                { tipo: "chuva", inicio: 4, fim: 9 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
        it("Chuva terminou depois do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 10, fim: 15 }];
            let resultado = [
                { tipo: "chuva", inicio: 10, fim: 15 }
            ];
            expect(processaIntervalos(chuva, manhaAtivo, tardeInativo)).to.deep.equal(resultado);
        })
    })

    context("Tarde ativo", () => {
        it("Nenhuma pausa de chuva", () => {
            expect(processaIntervalos([], manhaInativo, tardeAtivo)).to.deep.equal([]);
        })
        it("Uma pausa de chuva durante o período", () => {
            let chuva = [{ tipo: "chuva", inicio: 15, fim: 16 }];
            let resultado = [
                { tipo: "chuva", inicio: 15, fim: 16 }
            ];
            expect(processaIntervalos(chuva, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Duas pausas de chuva durante o período", () => {
            let chuva = [{ tipo: "chuva", inicio: 15, fim: 16 }, { tipo: "chuva", inicio: 17, fim: 18 }];
            let resultado = [
                { tipo: "chuva", inicio: 15, fim: 16 },
                { tipo: "chuva", inicio: 17, fim: 18 }
            ];
            expect(processaIntervalos(chuva, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Chuva começou antes do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 11, fim: 15 }];
            let resultado = [
                { tipo: "chuva", inicio: 11, fim: 15 }
            ];
            expect(processaIntervalos(chuva, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
        it("Chuva terminou depois do período", () => {
            let chuva = [{ tipo: "chuva", inicio: 18, fim: 22 }];
            let resultado = [
                { tipo: "chuva", inicio: 18, fim: 22 }
            ];
            expect(processaIntervalos(chuva, manhaInativo, tardeAtivo)).to.deep.equal(resultado);
        })
    })
})



describe("subtraiIntervalos()", () => {
    context("Subtrai os intervalos dentro do dia", () => {
        it("Nenhum intervalo", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [];
            let resultado = [{ inicio: 8, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Apenas intervalo do almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "almoço", inicio: 11, fim: 14 }];
            let resultado = [{ inicio: 8, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Apenas uma chuva", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 11, fim: 14 }];
            let resultado = [{ inicio: 8, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Almoço e uma chuva", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "almoço", inicio: 11, fim: 14 }];
            let resultado = [{ inicio: 8, fim: 9 }, { inicio: 10, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Almoço e duas chuvas", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 9, fim: 10 }, { tipo: "almoço", inicio: 11, fim: 14 }, { tipo: "chuva", inicio: 15, fim: 16 }];
            let resultado = [{ inicio: 8, fim: 9 }, { inicio: 10, fim: 11 }, { inicio: 14, fim: 15 }, { inicio: 16, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
    })
    context("Subtrai os intervalos intercedendo o dia", () => {
        it("Chuva começando o dia, sem almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 5, fim: 9 }];
            let resultado = [{ inicio: 9, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva começando o dia, com almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 5, fim: 10 }, { tipo: "almoço", inicio: 11, fim: 14 }];
            let resultado = [{ inicio: 10, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva terminando o dia, sem almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 15, fim: 20 }];
            let resultado = [{ inicio: 8, fim: 15 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva terminando o dia, com almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "almoço", inicio: 11, fim: 14 }, { tipo: "chuva", inicio: 15, fim: 20 }];
            let resultado = [{ inicio: 8, fim: 11 }, { inicio: 14, fim: 15 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
    })
    context("Ignora os intervalos fora do horário do dia", () => {
        it("Chuva antes do dia", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 5, fim: 7 }];
            let resultado = [{ inicio: 8, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva antes do dia, com almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 5, fim: 7 }, { tipo: "almoço", inicio: 11, fim: 14 }];
            let resultado = [{ inicio: 8, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva além do dia, sem almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "chuva", inicio: 18, fim: 20 }];
            let resultado = [{ inicio: 8, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
        it("Chuva além do dia, com almoço", () => {
            let dia = { inicio: 8, fim: 17 };
            let intervalos = [{ tipo: "almoço", inicio: 11, fim: 14 }, { tipo: "chuva", inicio: 18, fim: 20 }];
            let resultado = [{ inicio: 8, fim: 11 }, { inicio: 14, fim: 17 }];
            expect(subtraiIntervalos(dia, intervalos)).to.deep.equal(resultado);
        })
    })
})
