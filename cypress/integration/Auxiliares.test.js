import {
    comparaPorHoraInicial,
    horarioDoDia,
    horaEntre,
    processaIntervalos,
    estaContidoEm,
    adicionaChuva,
    subtraiIntervalos,
    identificaPeriodos,
    processaPeriodos
} from "../../src/modulos/Auxiliares";

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

        // FIXME Adicionar mais testes
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