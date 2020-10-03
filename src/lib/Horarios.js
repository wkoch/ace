/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Manhã } Manhã
 * @typedef { import("./Tipos").Tarde } Tarde
 * @typedef { import("./Tipos").Horário } Horário
 * @typedef { import("./Tipos").Momento } Momento
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Tempo } Tempo
 */

/** @type {(horario: string) => Horário} */
export function horarioTextoParaObjeto(horario) {
    let [horas, minutos] = horario.split(":");
    return { horas: Number(horas), minutos: Number(minutos) };
}

/** @type {(horario: string) => number} */
export function horarioEmMinutos(horario) {
    let { horas, minutos } = horarioTextoParaObjeto(horario);
    return horas * 60 + minutos;
}


/** @type {(a: Tempo, b: Tempo) => number} */
export function comparaPorHoraInicial(a, b) {
    /** @type {Hora} */
    const elementoA = a.inicio;
    /** @type {Hora} */
    const elementoB = b.inicio;

    if (elementoA > elementoB) {
        return 1;
    } else if (elementoA < elementoB) {
        return -1;
    }
    return 0;
}


/** @type {(lista: Intervalos) => Intervalos} */
export function ordenaPorHoraInicial(lista) {
    return lista.sort(comparaPorHoraInicial);
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


/** @type {(h: Hora, a: (Hora | Momento), b: Hora) => boolean} */
export function horaEntre(h, a, b = 0) {
    if (typeof a == "object") {
        return (h >= a.inicio && h <= a.fim);
    } else {
        return (h >= a && h <= b);
    }
}