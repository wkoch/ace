/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Número } Número
 * @typedef { import("./Tipos").Vistoria } Vistoria
 * @typedef { import("./Tipos").Vistorias } Vistorias
 * @typedef { import("./Tipos").TipoVistoria } TipoVistoria
 * @typedef { import("./Tipos").Períodos } Períodos
 */

import { TEMPO, TIPO } from "../data/Dados";
import { horaEntre } from "./Horarios";


/** @type {(vistoria: TipoVistoria | Vistoria, media: Número) => Hora} */
export function duracaoDaVistoria(vistoria, media) {
    if (vistoria.tipo == TIPO.FECHADA) {
        return TEMPO.FECHADAS;
    } else if (vistoria.tipo == TIPO.NORMAL || vistoria.tipo == TIPO.RECUPERADA) {
        return media;
    }
}



/** @type {(vistorias: Vistorias, periodos: Períodos, media: Número) => Vistorias} */
export function divideVistoriasEntrePeríodos(vistorias, periodos, media) {
    /** @type {Vistorias} */
    let novoVistorias = [];
    /** @type {Número} */
    let contador = 0;

    periodos.forEach(periodo => {
        /** @type {Hora} */
        let ultimoHorario = periodo.inicio;

        if (horaEntre(ultimoHorario, periodo)) {
            vistorias.forEach(vistoria => {
                /** @type {Hora} */
                let proximoHorario = ultimoHorario + duracaoDaVistoria(vistoria, media);
                novoVistorias.push({
                    index: contador,
                    periodo: periodo.periodo,
                    tipo: vistoria.tipo,
                    inicio: ultimoHorario,
                    fim: proximoHorario
                })
                contador += 1;
                ultimoHorario = proximoHorario;
            });
        }
    });

    return novoVistorias;
}