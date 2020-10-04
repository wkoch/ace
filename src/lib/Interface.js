/**
 * @typedef { import("./Tipos").TipoVistorias } TipoVistorias
 * @typedef { import("./Tipos").Intervalo } Intervalo
 * @typedef { import("./Tipos").Intervalos } Intervalos
 */

import { estáContidoEm } from "./Auxiliares";
import { horaEntre, ordenaPorHoraInicial } from "./Horários";

/** @type {(chuvas: Intervalos, novo: Intervalo) => Intervalos} */
export function adicionaChuva(chuvas, novo) {
    /** @type {Intervalos} */
    let novoChuvas = [];
    /** @type {boolean} */
    let intercede = false;

    if (chuvas.length > 0) {
        chuvas.forEach(chuva => {
            /** @type {Intervalos} */
            let coincide = chuvas.filter(function (elemento) {
                return elemento.fim == chuva.início;
            });
            if (coincide.length > 0) {
                // São sequenciais, melhor unir
                coincide[0].fim = chuva.fim;
                novoChuvas.push(coincide[0]);
            } else {
                /** @type {Intervalo} */
                let novoChuva = chuva;
                // Unir interseções
                if (estáContidoEm(novo, chuva)) {
                    // Novo está dentro da chuva existente.
                    novoChuvas.push(chuva);
                    intercede = true;
                } else if (estáContidoEm(chuva, novo)) {
                    // Chuva existente está dentro da nova Chuva.
                    novoChuvas.push(novo);
                    intercede = true;
                } else if (horaEntre(novo.início, chuva) && novo.fim > chuva.fim) {
                    // Bloco começa dentro e termina depois da chuva existente.
                    novoChuva.fim = novo.fim;
                    novoChuvas.push(chuva);
                    intercede = true;
                } else if (novo.início < chuva.início && horaEntre(novo.fim, chuva)) {
                    // Bloco começa antes e termina dentro da chuva existente.
                    novoChuva.início = novo.início;
                    novoChuvas.push(chuva);
                    intercede = true;
                } else {
                    // Não intercede, adiciona normalmente.
                    novoChuvas.push(chuva);
                }
            }
        });
    }

    if (!intercede) {
        novoChuvas.push(novo);
    }

    return ordenaPorHoraInicial(novoChuvas);
}


/** @type {(vistorias: TipoVistorias, tipo: string) => TipoVistorias} */
export function adicionaVistoria(vistorias, tipo) {
    return [...vistorias, { id: vistorias.length, tipo: tipo }];
}