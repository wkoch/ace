/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Manhã } Manhã
 * @typedef { import("./Tipos").Tarde } Tarde
 * @typedef { import("./Tipos").Momento } Momento
 * @typedef { import("./Tipos").Momentos } Momentos
 * @typedef { import("./Tipos").Períodos } Períodos
 * @typedef { import("./Tipos").Intervalos } Intervalos
 */

import { estaContidoEm } from "./Auxiliares";
import { horarioDoDia } from "./Horarios";
import { processaIntervalos, subtraiIntervalos } from "./Intervalos";


/** @type {(momentos: Momentos, manha: Manhã, tarde: Tarde) => Períodos} */
export function identificaPeriodos(momentos, manha, tarde) {
    /** @type {Períodos} */
    let novoPeriodos = [];

    momentos.forEach(momento => {
        if (estaContidoEm(momento, manha)) {
            novoPeriodos.push({
                periodo: "Manhã",
                inicio: momento.inicio,
                fim: momento.fim
            });
        } else {
            novoPeriodos.push({
                periodo: "Tarde",
                inicio: momento.inicio,
                fim: momento.fim
            });
        }
    });

    return novoPeriodos;
}


/** @type {(manha: Manhã, tarde: Tarde, chuvas: Intervalos) => Períodos} */
export function processaPeriodos(manha, tarde, chuvas) {
    // Pega o horário de trabalho total do dia
    /** @type {Momento} */
    const dia = horarioDoDia(manha, tarde);

    /** @type {Intervalos} */
    const intervalos = processaIntervalos(chuvas, manha, tarde);

    // gera os periodos sem intervalos
    /** @type {Momentos} */
    const momentos = subtraiIntervalos(dia, intervalos);

    /** @type {Períodos} */
    const periodos = identificaPeriodos(momentos, manha, tarde);

    return periodos;
}


/** @type {(periodos: Períodos) => Hora} */
export function duracaoTotalPeriodos(periodos) {
    /** @type {Hora} */
    let duracaoTotal = 0;

    periodos.forEach(periodo => {
        duracaoTotal += periodo.fim - periodo.inicio;
    });

    return duracaoTotal;
}