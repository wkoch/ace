/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Períodos } Períodos
 * @typedef { import("./Tipos").Relatórios } Relatórios
 * @typedef { import("./Tipos").TipoVistoria } TipoVistoria
 * @typedef { import("./Tipos").Vistoria } Vistoria
 * @typedef { import("./Tipos").Vistorias } Vistorias
 */

import { TEMPO, TIPO } from "../data/Constantes";
import { horaEntre, ordenaPorHoraInicial } from "./Horários";


/** @type {(vistoria: TipoVistoria | Vistoria, media: number) => Hora} */
export function duraçãoDaVistoria(vistoria, media) {
    if (vistoria.tipo == TIPO.FECHADA) {
        return TEMPO.FECHADAS;
    } else if (vistoria.tipo == TIPO.NORMAL || vistoria.tipo == TIPO.RECUPERADA) {
        return media;
    }
}



/** @type {(vistorias: Vistorias, períodos: Períodos, media: number) => Vistorias} */
export function divideVistoriasEntrePeríodos(vistorias, períodos, média) {
    /** @type {Vistorias} */
    let novoVistorias = [];
    /** @type {number} */
    let contador = 0;

    períodos.forEach(período => {
        /** @type {Hora} */
        let ultimoHorário = período.início;

        if (horaEntre(ultimoHorário, período)) {
            vistorias.forEach(vistoria => {
                /** @type {Hora} */
                let proximoHorário = ultimoHorário + duraçãoDaVistoria(vistoria, média);
                novoVistorias.push({
                    id: contador,
                    período: período.período,
                    tipo: vistoria.tipo,
                    início: ultimoHorário,
                    fim: proximoHorário
                })
                contador += 1;
                ultimoHorário = proximoHorário;
            });
        }
    });

    return novoVistorias;
}

/** @type {(vistorias: Vistorias, intervalos: Intervalos) => Relatórios} */
export function geraRelatório(vistorias, intervalos) {
    return ordenaPorHoraInicial([...vistorias, ...intervalos]);
}