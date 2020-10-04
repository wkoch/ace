/**
 * @typedef { import("../lib/Tipos").Manhã } Manhã
 * @typedef { import("../lib/Tipos").Tarde } Tarde
 * @typedef { import("../lib/Tipos").Períodos } Períodos
 * @typedef { import("../lib/Tipos").Vistorias } Vistorias
 * @typedef { import("../lib/Tipos").Intervalos } Intervalos
 */

/** @type {string} */
export let VERSÃO = "5.0.0";


/** @type {{
 * ALEATORIEDADE: "Aleatoriedade",
 * ALMOÇO: "Almoço",
 * BLOQUEIO: "Bloqueio",
 * CANCELAR: "Cancelar",
 * CHUVA: "Chuva",
 * CONTEÚDO: {AJUDA: string, DESCRIÇÃO: string, SUBTÍTULO: string, TÍTULO: string }
 * ENTRADA: "Entrada",
 * FECHADA: "Fechada",
 * FECHAR: "Fechar",
 * FIM: "Fim",
 * INÍCIO: "Início",
 * MANHÃ: "Manhã",
 * MENU: "Menu",
 * MODAL: {ERROMENOR: string, ERROVAZIO: string, TEXTO: string, TÍTULO: string},
 * NORMAL: "Normal",
 * OPÇÕES: "Opções",
 * RECUPERADA: "Recuperada",
 * SAÍDA: "Saída",
 * SALVAR: "Salvar",
 * TARDE: "Tarde",
 * TÉRMINO: "Término",
 * TIPO: "Tipo",
 * }} */
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
        ERROMENOR: "Horário final deve ser maior que o inicial.",
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

export const TIPO = {
    FECHADA: TEXTO.FECHADA,
    NORMAL: TEXTO.NORMAL,
    RECUPERADA: TEXTO.RECUPERADA
}

export const ÍCONE = {
    CHUVA: "umbrella",
    FECHADA: "times-circle",
    NORMAL: "check-circle",
    RECUPERADA: "recycle",
}


// DADOS DA MANHÃ
/** @type {Manhã} */
export let Manha = {
    período: "Manhã",
    ativo: true,
    início: 520,
    fim: 680
}


// DADOS DA TARDE
/** @type {Tarde} */
export let Tarde = {
    período: "Tarde",
    ativo: true,
    início: 860,
    fim: 1040
}