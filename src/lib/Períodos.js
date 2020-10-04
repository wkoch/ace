/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Manhã } Manhã
 * @typedef { import("./Tipos").Tarde } Tarde
 * @typedef { import("./Tipos").Momento } Momento
 * @typedef { import("./Tipos").Momentos } Momentos
 * @typedef { import("./Tipos").Períodos } Períodos
 * @typedef { import("./Tipos").Intervalos } Intervalos
 */

import { TEMPO } from "../data/Constantes";
import { horárioDoDia } from "./Horários";
import { estáContidoEm } from "./Auxiliares";
import { processaIntervalos, subtraiIntervalos } from "./Intervalos";



/** @type {(momentos: Momentos, manhã: Manhã, tarde: Tarde) => Períodos} */
export function identificaPeríodos(momentos, manhã, tarde) {
    /** @type {Períodos} */
    let novoPeríodos = [];

    momentos.forEach(momento => {
        if (estáContidoEm(momento, manhã)) {
            novoPeríodos.push({
                período: "Manhã",
                início: momento.início,
                fim: momento.fim
            });
        } else {
            novoPeríodos.push({
                período: "Tarde",
                início: momento.início,
                fim: momento.fim
            });
        }
    });

    return novoPeríodos;
}


/** @type {(manhã: Manhã, tarde: Tarde, chuvas: Intervalos) => Períodos} */
export function processaPeríodos(manhã, tarde, chuvas) {
    // Pega o horário de trabalho total do dia
    /** @type {Momento} */
    const dia = horárioDoDia(manhã, tarde);

    /** @type {Intervalos} */
    const intervalos = processaIntervalos(chuvas, manhã, tarde);

    // gera os períodos sem intervalos
    /** @type {Momentos} */
    const momentos = subtraiIntervalos(dia, intervalos);

    /** @type {Períodos} */
    const períodos = identificaPeríodos(momentos, manhã, tarde);

    return períodos;
}


/** @type {(períodos: Períodos) => Hora} */
export function duraçãoTotalPeríodos(períodos) {
    /** @type {Hora} */
    let duraçãoTotal = 0;

    períodos.forEach(período => {
        duraçãoTotal += período.fim - período.início;
    });

    return duraçãoTotal;
}


/** @type {(períodos: Períodos, normais: number, fechadas: number, recuperadas: number) => Hora} */
export function médiaGeral(períodos, normais, fechadas, recuperadas) {
    /** @type {Hora} */
    const duraçãoTotal = duraçãoTotalPeríodos(períodos);

    return (duraçãoTotal - fechadas * TEMPO.FECHADAS) / (normais + recuperadas - 1);
}