/**
 * @typedef { import("../lib/Type").ICON } ICON
 * @typedef { import("../lib/Type").Interval } Interval
 * @typedef { import("../lib/Type").Morning } Morning
 * @typedef { import("../lib/Type").Periods } Periods
 * @typedef { import("../lib/Type").Afternoon } Afternoon
 * @typedef { import("../lib/Type").TEXT } TEXT
 * @typedef { import("../lib/Type").Type } Type
 * @typedef { import("../lib/Type").Inspections } Inspections
 */

/** @type {string} */
export let Version = "5.0.0";


/** @type {TEXT} */
export let TEXT = {
    AFTERNOON: "Tarde",
    CANCEL: "Cancelar",
    CLOSE: "Fechar",
    CLOSED: "Fechada",
    CONTENT: {
        DESCRIPTION: "Não há vistorias no momento.",
        HELP: "Clique nos botões abaixo para adicionar novas vistorias.",
        SUBTITLE: "Calculadora de horários de vistorias",
        TITLE: "ACE v" + Version,
    },
    END: "Fim",
    ENTERED: "Entrada",
    EXITED: "Saída",
    LOCK: "Bloqueio",
    LUNCH: "Almoço",
    MENU: "Menu",
    MODAL: {
        ERROR_EMPTY: "Preencha os dois horários.",
        ERROR_EQUAL: "Os horários não podem ser iguais.",
        ERROR_INVERTED: "Início deve ser menor que Fim.",
        TEXT: "Marque o horário do período de chuva:",
        TITLE: "Registrar Chuva",
    },
    MORNING: "Manhã",
    NORMAL: "Normal",
    OPTIONS: "Opções",
    RAIN: "Chuva",
    RANDOM: "Aleatoriedade",
    RECOVERED: "Recuperada",
    SAVE: "Salvar",
    START: "Início",
    TYPE: "Tipo",
}


export const TIME = {
    CLOSED: 3
}

/** @type {Type} */
export const TYPE = {
    LUNCH: TEXT.LUNCH,
    RAIN: TEXT.RAIN,
    CLOSED: TEXT.CLOSED,
    NORMAL: TEXT.NORMAL,
    RECOVERED: TEXT.RECOVERED
}

/** @type {ICON} */
export const ICON = {
    LUNCH: "utensils",
    RAIN: "umbrella",
    CLOSED: "times-circle",
    NORMAL: "check-circle",
    RECOVERED: "recycle",
}


// DADOS DA MORNING
/** @type {Morning} */
export let Morning = {
    period: TEXT.MORNING,
    active: true,
    start: 520,
    end: 680
}


// DADOS DA AFTERNOON
/** @type {Afternoon} */
export let Afternoon = {
    period: TEXT.AFTERNOON,
    active: true,
    start: 860,
    end: 1040
}