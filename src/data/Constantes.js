/**
 * @typedef { import("../lib/Tipos").ÍCONE } ÍCONE
 * @typedef { import("../lib/Tipos").Intervalos } Intervalos
 * @typedef { import("../lib/Tipos").Manhã } Manhã
 * @typedef { import("../lib/Tipos").Períodos } Períodos
 * @typedef { import("../lib/Tipos").Tarde } Tarde
 * @typedef { import("../lib/Tipos").TEXTO } TEXTO
 * @typedef { import("../lib/Tipos").TIPOVISTORIA } TIPOVISTORIA
 * @typedef { import("../lib/Tipos").Vistorias } Vistorias
 */

/** @type {string} */
export let VERSÃO = "5.0.0";


/** @type {TEXTO} */
export let TEXTO = {
    ALEATORIEDADE: "Aleatoriedade",
    ALMOÇO: "Almoço",
    BLOQUEIO: "Bloqueio",
    CANCELAR: "Cancelar",
    CHUVA: "Chuva",
    CONTEÚDO: {
        AJUDA: "Clique nos botões abaixo para adicionar novas vistorias.",
        DESCRIÇÃO: "Não há vistorias no momento.",
        SUBTÍTULO: "Calculadora de horários de vistorias",
        TÍTULO: "ACE v" + VERSÃO,
    },
    ENTRADA: "Entrada",
    FECHADA: "Fechada",
    FECHAR: "Fechar",
    FIM: "Fim",
    INÍCIO: "Início",
    MANHÃ: "Manhã",
    MENU: "Menu",
    MODAL: {
        ERROIGUAIS: "Os horários não podem ser iguais.",
        ERROMENOR: "Início deve ser menor que Fim.",
        ERROVAZIO: "Preencha os dois horários.",
        TEXTO: "Marque o horário do período de chuva:",
        TÍTULO: "Registrar Chuva",
    },
    NORMAL: "Normal",
    OPÇÕES: "Opções",
    RECUPERADA: "Recuperada",
    SAÍDA: "Saída",
    SALVAR: "Salvar",
    TARDE: "Tarde",
    TÉRMINO: "Término",
    TIPO: "Tipo",
}


export const TEMPO = {
    FECHADAS: 3
}

/** @type {TIPOVISTORIA} */
export const TIPO = {
    ALMOÇO: TEXTO.ALMOÇO,
    CHUVA: TEXTO.CHUVA,
    FECHADA: TEXTO.FECHADA,
    NORMAL: TEXTO.NORMAL,
    RECUPERADA: TEXTO.RECUPERADA
}

/** @type {ÍCONE} */
export const ÍCONE = {
    ALMOÇO: "utensils",
    CHUVA: "umbrella",
    FECHADA: "times-circle",
    NORMAL: "check-circle",
    RECUPERADA: "recycle",
}


// DADOS DA MANHÃ
/** @type {Manhã} */
export let Manha = {
    período: TEXTO.MANHÃ,
    ativo: true,
    início: 520,
    fim: 680
}


// DADOS DA TARDE
/** @type {Tarde} */
export let Tarde = {
    período: TEXTO.TARDE,
    ativo: true,
    início: 860,
    fim: 1040
}