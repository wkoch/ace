/**
 * @typedef { import("./Tipos").Tempo } Tempo
 */

import { horaEntre } from "./Horarios";


/** @type {(objeto1: Tempo, objeto2: Tempo) => boolean} */
export function estaContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.inicio, objeto2) && horaEntre(objeto1.fim, objeto2));
}






