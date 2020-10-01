/** @typedef {number} Número */
/** @typedef {string} Texto */
/** @typedef {Número} Hora */
/** @typedef {{ tipo: ("chuva" | "almoço"), inicio: Número, fim: Número }} Intervalo */
/** @typedef {Array<{ tipo: ("chuva" | "almoço"), inicio: Número, fim: Número }>} Intervalos */
/** @typedef {{ inicio: Número, fim: Número }} Momento */
/** @typedef {Array<Momento>} Momentos */
/** @typedef {{ periodo: ("Manhã" | "Tarde"), inicio: Número, fim: Número }} Período */
/** @typedef {Array<Período>} Períodos */
/** @typedef {{ ativo: boolean, periodo: ("Manhã" | "Tarde"), inicio: Número, fim: Número }} Manhã */
/** @typedef {{ ativo: boolean, periodo: ("Manhã" | "Tarde"), inicio: Número, fim: Número }} Tarde */
/** @typedef {Intervalo | Momento | Período | Manhã | Tarde} Tempo */

/** @type {(a: Tempo, b: Tempo ) => Número} */
export function comparaPorHoraInicial(a, b) {

    /** @type {Hora} */
    const elementoA = a.inicio;
    /** @type {Hora} */
    const elementoB = b.inicio;

    /** @type {Número} */
    let comparacao = 0;
    if (elementoA > elementoB) {
        comparacao = 1;
    } else if (elementoA < elementoB) {
        comparacao = -1;
    }
    return comparacao;
}

/** @type {(manha: Manhã, tarde: Tarde) => Momento} */
export function horarioDoDia(manha, tarde) {
    if (manha.ativo && tarde.ativo) {
        return { inicio: manha.inicio, fim: tarde.fim };
    } else if (manha.ativo) {
        return { inicio: manha.inicio, fim: manha.fim };
    } else {
        return { inicio: tarde.inicio, fim: tarde.fim };
    }
}

/** @type {(h: Hora, a: (Hora | Momento), b: Hora ) => boolean} */
export function horaEntre(h, a, b = 0) {
    if (typeof a == "object") {
        return (h >= a.inicio && h <= a.fim);
    } else {
        return (h >= a && h <= b);
    }
}

/** @type {(chuvas: Intervalos, manha: Manhã, tarde: Tarde) => Intervalos} */
export function processaIntervalos(chuvas, manha, tarde) {
    /** @type {Intervalos} */
    let intervalos = [];
    /** @type {Intervalo} */
    let almoco = { tipo: "almoço", inicio: 0, fim: 0 };

    if (manha.ativo && tarde.ativo) {
        // Só existe almoço quando tiver dois períodos ativos.
        /** @type {Intervalo} */
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
        return intervalos.sort(comparaPorHoraInicial);
    } else {
        return intervalos;
    }
}

/** @type {(objeto1: (Intervalo | Momento), objeto2: (Intervalo | Momento)) => boolean} */
export function estaContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.inicio, objeto2) && horaEntre(objeto1.fim, objeto2));
}

/** @type {(chuvas: Intervalos, novo: Intervalo) => Intervalos} */
export function adicionaChuva(chuvas, novo) {
    /** @type {Intervalos} */
    let novoChuvas = [];
    /** @type {boolean} */
    let intercede = false;

    if (chuvas.length > 0) {
        chuvas.forEach(chuva => {
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
        });
    }

    if (!intercede) {
        novoChuvas.push(novo);
    }

    return (chuvas = novoChuvas.sort(comparaPorHoraInicial));
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

/** @type {(manha: Manhã, tarde: Tarde) => Períodos} */
export function processaPeriodos(manha, tarde) {
    // Pega o horário de trabalho total do dia
    /** @type {Momento} */
    let dia = horarioDoDia(manha, tarde);

    /** @type {Intervalos} */
    let chuvas = [{ tipo: "chuva", inicio: 9, fim: 10 }];

    /** @type {Intervalos} */
    let intervalos = processaIntervalos(chuvas, manha, tarde);

    // gera os periodos sem intervalos
    /** @type {Momentos} */
    let momentos = subtraiIntervalos(dia, intervalos);

    /** @type {Períodos} */
    let periodos = identificaPeriodos(momentos, manha, tarde);
    console.table(periodos);
    return periodos;
}

processaPeriodos({ ativo: true, periodo: "Manhã", inicio: 8, fim: 12 }, { ativo: true, periodo: "Tarde", inicio: 13, fim: 17 });