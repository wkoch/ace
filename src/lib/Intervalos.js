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

import { estaContidoEm } from "./Auxiliares";
import { horaEntre, ordenaPorHoraInicial } from "./Horarios";


/** @type {(chuvas: Intervalos, manha: Manhã, tarde: Tarde) => Intervalos} */
export function processaIntervalos(chuvas, manha, tarde) {
    /** @type {Intervalos} */
    let intervalos = [];
    /** @type {Intervalo} */
    let almoco = { tipo: "almoço", inicio: 0, fim: 0 };

    if (manha.ativo && tarde.ativo) {
        // Só existe almoço quando tiver dois períodos ativos.
        almoco.inicio = manha.fim;
        almoco.fim = tarde.inicio;
        intervalos.push(almoco);

        if (chuvas.length > 0) {
            chuvas.forEach(chuva => {
                /** @type {Intervalo} */
                let novoChuva = { ...chuva };
                if (horaEntre(chuva.inicio, manha.inicio, manha.fim) && horaEntre(chuva.fim, almoco.inicio, almoco.fim)) {
                    // Começa durante a manhã e termina durante o almoço;
                    novoChuva.fim = almoco.inicio;
                    intervalos.push(novoChuva);
                } else if (horaEntre(chuva.inicio, manha.inicio, manha.fim) && horaEntre(chuva.fim, tarde.inicio, tarde.fim)) {
                    // Começa durante a manhã e termina durante a tarde.

                    // Divide em dois blocos
                    // Um bloco antes do almoço
                    novoChuva.fim = almoco.inicio;
                    intervalos.push(novoChuva);
                    // Outro bloco depois do almoço
                    novoChuva.inicio = almoco.fim;
                    novoChuva.fim = chuva.fim;
                    intervalos.push(novoChuva);
                } else if (horaEntre(chuva.inicio, almoco.inicio, almoco.fim) && horaEntre(chuva.fim, almoco.inicio, almoco.fim)) {
                    // Começa durante o almoço e termina durante o almoço.
                    // Ignora o bloco de chuva.
                } else if (horaEntre(chuva.inicio, almoco.inicio, almoco.fim) && horaEntre(chuva.fim, tarde.inicio, tarde.fim)) {
                    // Começa durante o almoço e termina a tarde.
                    novoChuva.inicio = almoco.fim;
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
            if (estaContidoEm(intervalo, novoDia)) {
                // Intervalo dentro do período do dia.
                momentos.push({
                    inicio: novoDia.inicio,
                    fim: intervalo.inicio
                })
                novoDia.inicio = intervalo.fim;
            } else if (intervalo.inicio < novoDia.inicio && intervalo.fim > novoDia.inicio && intervalo.fim < novoDia.fim) {
                // Intervalo começa antes do período do dia e termina dentro.
                novoDia.inicio = intervalo.fim;
            } else if (horaEntre(intervalo.inicio, novoDia) && intervalo.fim > novoDia.fim) {
                // Intervalo começa dentro do período do dia e termina depois.
                novoDia.fim = intervalo.inicio;
            } else if (estaContidoEm(novoDia, intervalo)) {
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