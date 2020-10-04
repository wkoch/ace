/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Períodos } Períodos
 * @typedef { import("./Tipos").Relatórios } Relatórios
 * @typedef { import("./Tipos").Tempo } Tempo
 * @typedef { import("./Tipos").Tipo } Tipo
 * @typedef { import("./Tipos").TipoVistoria } TipoVistoria
 * @typedef { import("./Tipos").Vistoria } Vistoria
 * @typedef { import("./Tipos").Vistorias } Vistorias
 */

import { ÍCONE, TEXTO, TIPO } from "../data/Constantes";
import { horaEntre } from "./Horários";


/** @type {(objeto1: Tempo, objeto2: Tempo) => boolean} */
export function estáContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.início, objeto2) && horaEntre(objeto1.fim, objeto2));
}


export function íconeDaVistoria(vistoria) {
    switch (vistoria.tipo) {
        case TIPO.NORMAL:
            return ÍCONE.NORMAL;
        case TIPO.FECHADA:
            return ÍCONE.FECHADA;
        case TIPO.RECUPERADA:
            return ÍCONE.RECUPERADA;
        case TIPO.CHUVA:
            return ÍCONE.CHUVA;
        case TIPO.ALMOÇO:
            return ÍCONE.ALMOÇO;
            break;
        default:
            return "";
            break;
    }
}


// Funções de filtragem

/** @type {(lista: Array<any>, tipo: Tipo) => Array<any>} */
export function filtrar(lista, tipo) {
    return lista.filter(obj => obj.tipo == tipo);
}

/** @type {(lista: Array<any>) => number} */
export function contaNormais(lista) {
    return filtrar(lista, TEXTO.NORMAL).length;
}

/** @type {(lista: Array<any>) => number} */
export function contaFechadas(lista) {
    return filtrar(lista, TEXTO.FECHADA).length;
}

/** @type {(lista: Array<any>) => number} */
export function contaRecuperadas(lista) {
    return filtrar(lista, TEXTO.RECUPERADA).length;
}