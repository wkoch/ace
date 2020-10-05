/**
 * @typedef { import("../../../src/lib/Type").Morning } Morning
 * @typedef { import("../../../src/lib/Type").Afternoon } Afternoon
 * @typedef { import("../../../src/lib/Type").Tempos } Tempos
 */

import { TEXT } from "../../../src/data/Data";

import {
    compareByStartSchedule,
    isScheduleBetween,
    daySchedule,
    timeInMinutes,
    timeTextToObject,
    minutesToText,
    orderByStartSchedule
} from "../../../src/lib/Time";


/** @type {Morning} */
let morning = { period: TEXT.MORNING, active: true, start: 8, end: 11 };
/** @type {Afternoon} */
let tarde = { period: TEXT.AFTERNOON, active: true, start: 14, end: 17 };

/** @type {Morning} */
let morningInactive = { period: TEXT.MORNING, active: false, start: 8, end: 11 };
/** @type {Afternoon} */
let tardeInactive = { period: TEXT.AFTERNOON, active: false, start: 14, end: 17 };


describe("compareByStartSchedule()", () => {
    context("Testa se o valor é igual, menor ou maior que outros dois", () => {
        it("Ambos iguais retorna 0", () => {
            expect(compareByStartSchedule(morning, morning)).to.equal(0);
        });
        it("Primeiro maior retorna 1", () => {
            expect(compareByStartSchedule(tarde, morning)).to.equal(1);
        });
        it("Primeiro menor retorna -1", () => {
            expect(compareByStartSchedule(morning, tarde)).to.equal(-1);
        });
    });
});

describe("isScheduleBetween()", () => {
    context("Comparação de horários numéricos", () => {
        /** @type {number} */
        let a = morning.start;
        /** @type {number} */
        let b = morning.end;

        it("Schedule está entre dois valores", () => {
            expect(isScheduleBetween(10, a, b)).to.be.true;
        })
        it("Schedule igual valor menor", () => {
            expect(isScheduleBetween(8, a, b)).to.be.true;
        })
        it("Schedule igual valor maior", () => {
            expect(isScheduleBetween(11, a, b)).to.be.true;
        })
        it("Schedule menor que valores", () => {
            expect(isScheduleBetween(7, a, b)).to.be.false;
        })
        it("Schedule maior que valores", () => {
            expect(isScheduleBetween(12, a, b)).to.be.false;
        })
    })
    context("Comparação de horário em objetos", () => {
        it("Schedule dentro de um period", () => {
            expect(isScheduleBetween(10, morning)).to.be.true;
        })
        it("Schedule igual start de um period", () => {
            expect(isScheduleBetween(8, morning)).to.be.true;
        })
        it("Schedule igual final de um period", () => {
            expect(isScheduleBetween(11, morning)).to.be.true;
        })
        it("Schedule antes de um period", () => {
            expect(isScheduleBetween(7, morning)).to.be.false;
        })
        it("Schedule depois de um period", () => {
            expect(isScheduleBetween(12, morning)).to.be.false;
        })
    })
})

describe("daySchedule()", () => {
    context("Calcula o period total do dia, ignora o intervalo do almoço", () => {
        it("Morning e Afternoon actives", () => {
            expect(daySchedule(morning, tarde)).to.deep.equal({ start: morning.start, end: tarde.end });
        })
        it("Morning active", () => {
            expect(daySchedule(morning, tardeInactive)).to.deep.equal({ start: morning.start, end: morning.end });
        })
        it("Afternoon active", () => {
            expect(daySchedule(morningInactive, tarde)).to.deep.equal({ start: tarde.start, end: tarde.end });
        })
    })
})

describe("timeInMinutes()", () => {
    context("Converte um horário em Texto para horário em Minutos", () => {
        it("Retorna 0 para string vazia", () => {
            expect(timeInMinutes("")).to.equal(0);
        });
        it("Converte 08:25 para 505", () => {
            expect(timeInMinutes("08:25")).to.equal(505);
        });
        it("Converte 10:00 para 600", () => {
            expect(timeInMinutes("10:00")).to.equal(600);
        });
    });
});

describe("timeTextToObject()", () => {
    context("Converte um horário em Texto para Objeto", () => {
        it("Converte 08:25 para {horas: 8, minutos: 25}", () => {
            expect(timeTextToObject("08:25")).to.deep.equal({ horas: 8, minutos: 25 });
        });
        it("Converte 10:00 para {horas: 10, minutos: 0}", () => {
            expect(timeTextToObject("10:00")).to.deep.equal({ horas: 10, minutos: 0 });
        });
    });
});

describe("minutesToText()", () => {
    context("Converte número pra Texto Horas e Minutos", () => {
        it("Converte 505 para 08:25", () => {
            expect(minutesToText(505)).to.equal("08:25");
        });
        it("Converte 600 para 10:00", () => {
            expect(minutesToText(600)).to.equal("10:00");
        });
    });
});

describe("orderByStartSchedule()", () => {
    context("Ordena uma lista de objetos por hora inicial", () => {
        it("Retorna a própria lista quanto estiver vazia", () => {
            expect(orderByStartSchedule([])).to.deep.equal([]);
        });
        it("Retorna a própria lista quando houver apenas um elemento", () => {
            /** @type {Tempos} */
            let lista = [morning]
            expect(orderByStartSchedule(lista)).to.deep.equal(lista);
        });
        it("Retorna a lista ordenada quando tiver mais elementos", () => {
            /** @type {Tempos} */
            let lista = [morning, tarde]
            expect(orderByStartSchedule(lista)).to.deep.equal(lista);
        });
    });
});