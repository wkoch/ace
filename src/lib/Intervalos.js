/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Manhã } Manhã
 * @typedef { import("./Tipos").Tarde } Tarde
 * @typedef { import("./Tipos").Momento } Momento
 * @typedef { import("./Tipos").Momentos } Momentos
 * @typedef { import("./Tipos").Intervalo } Intervalo
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Tempo } Tempo
 */

import { TEXTO } from "../data/Constantes";
import { estáContidoEm } from "./Auxiliares";
import { horaEntre, ordenaPorHoraInicial } from "./Horários";


/** @type {(chuvas: Intervalos, manhã: Manhã, tarde: Tarde) => Intervalos} */
export function processaIntervalos(chuvas, manhã, tarde) {
    /** @type {Intervalos} */
    let intervalos = [];
    /** @type {Intervalo} */
    let almoço = { tipo: TEXTO.ALMOÇO, início: 0, fim: 0 };

    if (manhã.ativo && tarde.ativo) {
        // Só existe almoço quando tiver dois períodos ativos.
        almoço.início = manhã.fim;
        almoço.fim = tarde.início;
        intervalos.push(almoço);

        if (chuvas.length > 0) {
            chuvas.forEach(chuva => {
                /** @type {Intervalo} */
                let novoChuva = { ...chuva };
                if (horaEntre(chuva.início, manhã.início, manhã.fim) && horaEntre(chuva.fim, almoço.início, almoço.fim)) {
                    // Começa durante a manhã e termina durante o almoço;
                    novoChuva.fim = almoço.início;
                    intervalos.push(novoChuva);
                } else if (horaEntre(chuva.início, manhã.início, manhã.fim) && horaEntre(chuva.fim, tarde.início, tarde.fim)) {
                    // Começa durante a manhã e termina durante a tarde.

                    // Divide em dois blocos
                    // Um bloco antes do almoço
                    novoChuva.fim = almoço.início;
                    intervalos.push(novoChuva);
                    // Outro bloco depois do almoço
                    novoChuva.início = almoço.fim;
                    novoChuva.fim = chuva.fim;
                    intervalos.push(novoChuva);
                } else if (horaEntre(chuva.início, almoço.início, almoço.fim) && horaEntre(chuva.fim, almoço.início, almoço.fim)) {
                    // Começa durante o almoço e termina durante o almoço.
                    // Ignora o bloco de chuva.
                } else if (horaEntre(chuva.início, almoço.início, almoço.fim) && horaEntre(chuva.fim, tarde.início, tarde.fim)) {
                    // Começa durante o almoço e termina a tarde.
                    novoChuva.início = almoço.fim;
                    intervalos.push(novoChuva);
                } else {
                    // Começa e termina dentro do período.
                    intervalos.push(novoChuva);
                }
            });
        }
    } else {
        // Primeira chuva
        if (chuvas.length > 0) {
            chuvas.forEach(chuva => {
                intervalos.push(chuva);
            });
        }
    }

    if (chuvas.length > 0) {
        return ordenaPorHoraInicial(intervalos);
    } else {
        return intervalos;
    }
}


/** @type {(dia: Momento, intervalos: Intervalos) => Momentos} */
export function subtraiIntervalos(dia, intervalos) {
    /** @type {Momento} */
    let novoDia = { ...dia };

    /** @type {Momentos} */
    let momentos = [];

    if (intervalos.length > 0) {
        intervalos.forEach(intervalo => {
            if (estáContidoEm(intervalo, novoDia)) {
                // Intervalo dentro do período do dia.
                momentos.push({
                    início: novoDia.início,
                    fim: intervalo.início
                })
                novoDia.início = intervalo.fim;
            } else if (intervalo.início < novoDia.início && intervalo.fim > novoDia.início && intervalo.fim < novoDia.fim) {
                // Intervalo começa antes do período do dia e termina dentro.
                novoDia.início = intervalo.fim;
            } else if (horaEntre(intervalo.início, novoDia) && intervalo.fim > novoDia.fim) {
                // Intervalo começa dentro do período do dia e termina depois.
                novoDia.fim = intervalo.início;
            } else if (estáContidoEm(novoDia, intervalo)) {
                // Intervalo cobre totalmente o dia.
                momentos = [];
                return momentos;
            } else {
                // Ignora períodos totalmente fora do horário do dia.
                return momentos;
            }
        });
        // Registra o último período, após o último intervalo.
        momentos.push(novoDia);
    } else {
        momentos.push(novoDia);
        return momentos;
    }
    return momentos;
}