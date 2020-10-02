/**
 * @typedef { import("./Tipos").Texto } Texto
 * @typedef { import("./Tipos").TipoVistorias } TipoVistorias
 * @typedef { import("./Tipos").Intervalo } Intervalo
 * @typedef { import("./Tipos").Intervalos } Intervalos
 */

import { estaContidoEm } from "./Auxiliares";
import { horaEntre, ordenaPorHoraInicial } from "./Horarios";

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
                return elemento.fim == chuva.inicio;
            });
            console.table(coincide);
            if (coincide.length > 0) {
                // São sequenciais, melhor unir
                coincide[0].fim = chuva.fim;
                novoChuvas.push(coincide[0]);
            } else {
                /** @type {Intervalo} */
                let novoChuva = chuva;
                // Unir interseções
                if (estaContidoEm(novo, chuva)) {
                    // Novo está dentro da chuva existente.
                    novoChuvas.push(chuva);
                    intercede = true;
                } else if (estaContidoEm(chuva, novo)) {
                    // Chuva existente está dentro da nova Chuva.
                    novoChuvas.push(novo);
                    intercede = true;
                } else if (horaEntre(novo.inicio, chuva) && novo.fim > chuva.fim) {
                    // Bloco começa dentro e termina depois da chuva existente.
                    novoChuva.fim = novo.fim;
                    novoChuvas.push(chuva);
                    intercede = true;
                } else if (novo.inicio < chuva.inicio && horaEntre(novo.fim, chuva)) {
                    // Bloco começa antes e termina dentro da chuva existente.
                    novoChuva.inicio = novo.inicio;
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


/** @type {(vistorias: TipoVistorias, tipo: Texto) => TipoVistorias} */
export function adicionaVistoria(vistorias, tipo) {
    return [...vistorias, { tipo: tipo }];
}