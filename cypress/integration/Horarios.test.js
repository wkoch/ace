import {
    comparaPorHoraInicial,
    horaEntre,
    horarioDoDia
} from "../../src/lib/Horarios";

// Funções focadas em horários

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