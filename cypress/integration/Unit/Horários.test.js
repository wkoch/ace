/**
 * @typedef { import("../../../src/lib/Tipos").Manhã } Manhã
 * @typedef { import("../../../src/lib/Tipos").Tarde } Tarde
 * @typedef { import("../../../src/lib/Tipos").Tempos } Tempos
 */

import { TEXTO } from "../../../src/data/Constantes";

import {
    comparaPorHoraInicial,
    horaEntre,
    horárioDoDia,
    horárioEmMinutos,
    horárioTextoParaObjeto,
    minutosEmTexto,
    ordenaPorHoraInicial
} from "../../../src/lib/Horários";


/** @type {Manhã} */
let manhã = { período: TEXTO.MANHÃ, ativo: true, início: 8, fim: 11 };
/** @type {Tarde} */
let tarde = { período: TEXTO.TARDE, ativo: true, início: 14, fim: 17 };

/** @type {Manhã} */
let manhãInativo = { período: TEXTO.MANHÃ, ativo: false, início: 8, fim: 11 };
/** @type {Tarde} */
let tardeInativo = { período: TEXTO.TARDE, ativo: false, início: 14, fim: 17 };


describe("comparaPorHoraInicial()", () => {
    context("Testa se o valor é igual, menor ou maior que outros dois", () => {
        it("Ambos iguais retorna 0", () => {
            expect(comparaPorHoraInicial(manhã, manhã)).to.equal(0);
        })
        it("Primeiro maior retorna 1", () => {
            expect(comparaPorHoraInicial(tarde, manhã)).to.equal(1);
        })
        it("Primeiro menor retorna -1", () => {
            expect(comparaPorHoraInicial(manhã, tarde)).to.equal(-1);
        })
    })
})

describe("horaEntre()", () => {
    context("Comparação de horários numéricos", () => {
        /** @type {number} */
        let a = manhã.início;
        /** @type {number} */
        let b = manhã.fim;

        it("Horário está entre dois valores", () => {
            expect(horaEntre(10, a, b)).to.be.true;
        })
        it("Horário igual valor menor", () => {
            expect(horaEntre(8, a, b)).to.be.true;
        })
        it("Horário igual valor maior", () => {
            expect(horaEntre(11, a, b)).to.be.true;
        })
        it("Horário menor que valores", () => {
            expect(horaEntre(7, a, b)).to.be.false;
        })
        it("Horário maior que valores", () => {
            expect(horaEntre(12, a, b)).to.be.false;
        })
    })
    context("Comparação de horário em objetos", () => {
        it("Horário dentro de um período", () => {
            expect(horaEntre(10, manhã)).to.be.true;
        })
        it("Horário igual início de um período", () => {
            expect(horaEntre(8, manhã)).to.be.true;
        })
        it("Horário igual final de um período", () => {
            expect(horaEntre(11, manhã)).to.be.true;
        })
        it("Horário antes de um período", () => {
            expect(horaEntre(7, manhã)).to.be.false;
        })
        it("Horário depois de um período", () => {
            expect(horaEntre(12, manhã)).to.be.false;
        })
    })
})

describe("horárioDoDia()", () => {
    context("Calcula o período total do dia, ignora o intervalo do almoço", () => {
        it("Manhã e Tarde ativos", () => {
            expect(horárioDoDia(manhã, tarde)).to.deep.equal({ início: manhã.início, fim: tarde.fim });
        })
        it("Manhã ativo", () => {
            expect(horárioDoDia(manhã, tardeInativo)).to.deep.equal({ início: manhã.início, fim: manhã.fim });
        })
        it("Tarde ativo", () => {
            expect(horárioDoDia(manhãInativo, tarde)).to.deep.equal({ início: tarde.início, fim: tarde.fim });
        })
    })
})

describe("horárioEmMinutos()", () => {
    context("Converte um horário em Texto para horário em Minutos", () => {
        it("Retorna 0 para string vazia", () => {
            expect(horárioEmMinutos("")).to.equal(0);
        });
        it("Converte 08:25 para 505", () => {
            expect(horárioEmMinutos("08:25")).to.equal(505);
        });
        it("Converte 10:00 para 600", () => {
            expect(horárioEmMinutos("10:00")).to.equal(600);
        });
    });
});

describe("horárioTextoParaObjeto()", () => {
    context("Converte um horário em Texto para Objeto", () => {
        it("Converte 08:25 para {horas: 8, minutos: 25}", () => {
            expect(horárioTextoParaObjeto("08:25")).to.deep.equal({ horas: 8, minutos: 25 });
        });
        it("Converte 10:00 para {horas: 10, minutos: 0}", () => {
            expect(horárioTextoParaObjeto("10:00")).to.deep.equal({ horas: 10, minutos: 0 });
        });
    });
});

describe("minutosEmTexto()", () => {
    context("Converte número pra Texto Horas e Minutos", () => {
        it("Converte 505 para 08:25", () => {
            expect(minutosEmTexto(505)).to.equal("08:25");
        });
        it("Converte 600 para 10:00", () => {
            expect(minutosEmTexto(600)).to.equal("10:00");
        });
    });
});

describe("ordenaPorHoraInicial()", () => {
    context("Ordena uma lista de objetos por hora inicial", () => {
        it("Retorna a própria lista quanto estiver vazia", () => {
            expect(ordenaPorHoraInicial([])).to.deep.equal([]);
        });
        it("Retorna a própria lista quando houver apenas um elemento", () => {
            /** @type {Tempos} */
            let lista = [manhã]
            expect(ordenaPorHoraInicial(lista)).to.deep.equal(lista);
        });
        it("Retorna a lista ordenada quando tiver mais elementos", () => {
            /** @type {Tempos} */
            let lista = [manhã, tarde]
            expect(ordenaPorHoraInicial(lista)).to.deep.equal(lista);
        });
    });
});