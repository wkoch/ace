/**
 * @typedef { import("./Tipos").Número } Número
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Tempo } Tempo
 * @typedef { import("./Tipos").Períodos } Períodos
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Vistoria } Vistoria
 * @typedef { import("./Tipos").Vistorias } Vistorias
 * @typedef { import("./Tipos").TipoVistoria } TipoVistoria
 */

import { horaEntre } from "./Horarios";
import { duracaoTotalPeriodos } from "./Periodos";
import { TEMPO } from "../data/Dados";


/** @type {(objeto1: Tempo, objeto2: Tempo) => boolean} */
export function estaContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.inicio, objeto2) && horaEntre(objeto1.fim, objeto2));
}


/** @type {(periodos: Períodos, normais: Número, fechadas: Número, recuperadas: Número) => Hora} */
export function mediaGeral(periodos, normais, fechadas, recuperadas) {
    /** @type {Hora} */
    const duracaoTotal = duracaoTotalPeriodos(periodos);

    return (duracaoTotal - fechadas * TEMPO.FECHADAS) / (normais + recuperadas - 1);
}



