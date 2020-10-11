/**
 * @typedef { import("../lib/Types").Morning } Morning
 * @typedef { import("../lib/Types").Periods } Periods
 * @typedef { import("../lib/Types").Afternoon } Afternoon
 * @typedef { import("../lib/Types").TEXT } TEXT
 * @typedef { import("../lib/Types").TYPE } TYPE
 * @typedef { import("../lib/Types").Inspections } Inspections
 */


/** @type {TEXT} */
export let TEXT = {
    AFTERNOON: "Tarde",
    CANCEL: "Cancelar",
    CLOSE: "Fechar",
    CLOSED: "Fechada",
    CONFIRM: { QUESTION: "Tem certeza que deseja excluir esta vistoria?", TITLE: "Excluir Vistoria", WARNING: "Esta ação não poderá ser desfeita." },
    CONTENT: { DESCRIPTION: "Não há vistorias registradas no momento.", HELP: "Clique nos botões abaixo para adicionar novas vistorias.", SUBTITLE: "Calculadora de horários de vistorias", TITLE: "Calculadora ACE", },
    DELETE: "Excluir",
    END: "Fim",
    ENTERED: "Entrada",
    EXITED: "Saída",
    LOCK: "Bloqueio",
    LUNCH: "Almoço",
    MENU: "Menu",
    MODAL: { ERROR_EMPTY: "Preencha os dois horários.", ERROR_EQUAL: "Os horários não podem ser iguais.", ERROR_INVERTED: "Início deve ser menor que Fim.", TEXT: "Marque o horário do período de chuva:", TITLE: "Registrar Chuva", },
    MORNING: "Manhã",
    NONE: "NONE",
    NORMAL: "Normal",
    OPTIONS: "Opções",
    RAIN: "Chuva",
    RANDOM: "Aleatoriedade",
    RECOVERED: "Recuperada",
    SAVE: "Salvar",
    START: "Início",
    TYPE: "Tipo",
    VERSION: "6.0.0"
}

/** @type {{CLOSED: number}} */
export const TIME = {
    CLOSED: 3
}

// /** @type {TYPE} */
// export const TYPE = {
//     CLOSED: TEXT.CLOSED,
//     LUNCH: TEXT.LUNCH,
//     NORMAL: TEXT.NORMAL,
//     RAIN: TEXT.RAIN,
//     RECOVERED: TEXT.RECOVERED
// }