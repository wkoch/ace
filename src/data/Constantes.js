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
 * MODAL: {ERRO: string, TEXTO: string, TÍTULO: string},
 * NORMAL: "Normal",
 * RECUPERADA: "Recuperada",
 * SAÍDA: "Saída",
 * SALVAR: "Salvar",
 * TARDE: "Tarde",
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
        ERRO: "Preencha os dois horários.",
        TEXTO: "Marque o horário do período de chuva:",
        TÍTULO: "Registrar Chuva",
    },
    NORMAL: "Normal",
    RECUPERADA: "Recuperada",
    SAÍDA: "Saída",
    SALVAR: "Salvar",
    TARDE: "Tarde",
    TIPO: "Tipo",
}


export const TEMPO = {
    FECHADAS: 3
}



// DADOS DA MANHÃ
/** @type {Manhã} */
export let Manha = {
    periodo: "Manhã",
    ativo: true,
    inicio: 520,
    fim: 680
}


// DADOS DA TARDE
/** @type {Tarde} */
export let Tarde = {
    periodo: "Tarde",
    ativo: true,
    inicio: 860,
    fim: 1040
}