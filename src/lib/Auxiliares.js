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


/** @type {(objeto1: Tempo, objeto2: Tempo) => boolean} */
export function estaContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.inicio, objeto2) && horaEntre(objeto1.fim, objeto2));
}






