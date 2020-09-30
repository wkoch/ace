import { comparaPorHoraInicial, horarioDoDia, horaEntre, processaIntervalos, estaContidoEm, adicionaChuva } from "../../src/modulos/Helpers";

describe("comparaPorHoraInicial()", () => {
    context("Testa se o valor é igual, menor ou maior que outros dois", () => {
        it("Ambos iguais retorna 0", () => {
            expect(comparaPorHoraInicial({ inicio: 10 }, { inicio: 10 })).to.equal(0);
        })
        it("Primeiro maior retorna 1", () => {
            expect(comparaPorHoraInicial({ inicio: 10 }, { inicio: 5 })).to.equal(1);
        })
        it("Primeiro menor retorna -1", () => {
            expect(comparaPorHoraInicial({ inicio: 5 }, { inicio: 10 })).to.equal(-1);
        })
    })
})

describe("horarioDoDia()", () => {
    context("Retorna o horário total do dia de trabalho em minutos", () => {
        it("Manhã e Tarde ativos", () => {
            expect(horarioDoDia({ ativo: true, inicio: 8, fim: 11 }, { ativo: true, inicio: 14, fim: 17 })).to.deep.equal({ inicio: 8, fim: 17 });
        })
        it("Manhã ativo", () => {
            expect(horarioDoDia({ ativo: true, inicio: 8, fim: 11 }, { ativo: false, inicio: 14, fim: 17 })).to.deep.equal({ inicio: 8, fim: 11 });
        })
        it("Tarde ativo", () => {
            expect(horarioDoDia({ ativo: false, inicio: 8, fim: 11 }, { ativo: true, inicio: 14, fim: 17 })).to.deep.equal({ inicio: 14, fim: 17 });
        })
    })
})

describe("horaEntre()", () => {
    context("Horário está entre dois números, inclusive", () => {
        it("Horário está entre dois valores", () => {
            expect(horaEntre(5, 2, 8)).to.be.true;
        })
        it("Horário igual valor menor", () => {
            expect(horaEntre(2, 2, 8)).to.be.true;
        })
        it("Horário igual valor maior", () => {
            expect(horaEntre(8, 2, 8)).to.be.true;
        })
        it("Horário menor que valores", () => {
            expect(horaEntre(1, 2, 8)).to.be.false;
        })
        it("Horário maior que valores", () => {
            expect(horaEntre(9, 2, 8)).to.be.false;
        })
    })
    context("Horário está dentro de período, inclusive", () => {
        it("Horário dentro de um período", () => {
            expect(horaEntre(5, { inicio: 2, fim: 8 })).to.be.true;
        })
        it("Horário igual início de um período", () => {
            expect(horaEntre(2, { inicio: 2, fim: 8 })).to.be.true;
        })
        it("Horário igual final de um período", () => {
            expect(horaEntre(8, { inicio: 2, fim: 8 })).to.be.true;
        })
        it("Horário antes de um período", () => {
            expect(horaEntre(1, { inicio: 2, fim: 8 })).to.be.false;
        })
        it("Horário depois de um período", () => {
            expect(horaEntre(9, { inicio: 2, fim: 8 })).to.be.false;
        })
    })
})

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

describe("estaContidoEm()", () => {
    context("Bloco horário está contido em outro bloco", () => {
        it("Verdadeiro para horários iguais", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 6 };
            let novo = { tipo: "chuva", inicio: 5, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.true;
            expect(estaContidoEm(existente, novo)).to.be.true;
        })
        it("Existente está contido no novo", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 6 };
            let novo = { tipo: "chuva", inicio: 1, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.true;
        })
        it("Novo está contido no existente", () => {
            let existente = { tipo: "chuva", inicio: 1, fim: 10 };
            let novo = { tipo: "chuva", inicio: 5, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.true;
        })
        it("Novo intercede o existente", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 10 };
            let novo = { tipo: "chuva", inicio: 4, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.false;
        })
        it("Novo extrapola o existente", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 10 };
            let novo = { tipo: "chuva", inicio: 6, fim: 12 };
            expect(estaContidoEm(novo, existente)).to.be.false;
        })
        it("Existente intercede o novo", () => {
            let existente = { tipo: "chuva", inicio: 4, fim: 6 };
            let novo = { tipo: "chuva", inicio: 5, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.false;
        })
        it("Existente extrapola o novo", () => {
            let existente = { tipo: "chuva", inicio: 6, fim: 12 };
            let novo = { tipo: "chuva", inicio: 5, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.false;
        })
    })
})

describe("adicionaChuva()", () => {
    context(".", () => {
        it("Primeira chuva", () => {
            let novo = { tipo: "chuva", inicio: 8, fim: 9 };
            let resultado = [novo];
            expect(adicionaChuva([], novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, sem interseção", () => {
            let chuvas = [{ tipo: "chuva", inicio: 8, fim: 9 }];
            let novo = { tipo: "chuva", inicio: 10, fim: 11 };
            let resultado = [{ tipo: "chuva", inicio: 8, fim: 9 }, { tipo: "chuva", inicio: 10, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, novo contido em chuva existente", () => {
            let chuvas = [{ tipo: "chuva", inicio: 8, fim: 11 }];
            let novo = { tipo: "chuva", inicio: 9, fim: 10 };
            let resultado = [{ tipo: "chuva", inicio: 8, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, chuva contido no novo", () => {
            let chuvas = [{ tipo: "chuva", inicio: 9, fim: 10 }];
            let novo = { tipo: "chuva", inicio: 8, fim: 11 };
            let resultado = [{ tipo: "chuva", inicio: 8, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, começa dentro, termina depois", () => {
            let chuvas = [{ tipo: "chuva", inicio: 8, fim: 11 }];
            let novo = { tipo: "chuva", inicio: 9, fim: 12 };
            let resultado = [{ tipo: "chuva", inicio: 8, fim: 12 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, começa antes, termina dentro", () => {
            let chuvas = [{ tipo: "chuva", inicio: 8, fim: 11 }];
            let novo = { tipo: "chuva", inicio: 7, fim: 10 };
            let resultado = [{ tipo: "chuva", inicio: 7, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
    })
})

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })