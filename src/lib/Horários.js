/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Manhã } Manhã
 * @typedef { import("./Tipos").Tarde } Tarde
 * @typedef { import("./Tipos").Horário } Horário
 * @typedef { import("./Tipos").Momento } Momento
 * @typedef { import("./Tipos").Intervalos } Intervalos
 * @typedef { import("./Tipos").Tempo } Tempo
 * @typedef { import("./Tipos").Tempos } Tempos
 */


/** @type {(a: Tempo, b: Tempo) => number} */
export function comparaPorHoraInicial(a, b) {
    /** @type {Hora} */
    const elementoA = a.início;
    /** @type {Hora} */
    const elementoB = b.início;

    if (elementoA > elementoB) {
        return 1;
    } else if (elementoA < elementoB) {
        return -1;
    }
    return 0;
}


/** @type {(h: Hora, a: (Hora | Momento), b: Hora) => boolean} */
export function horaEntre(h, a, b = 0) {
    if (typeof a == "object") {
        return (h >= a.início && h <= a.fim);
    } else {
        return (h >= a && h <= b);
    }
}


/** @type {(manha: Manhã, tarde: Tarde) => Momento} */
export function horárioDoDia(manha, tarde) {
    if (manha.ativo && tarde.ativo) {
        return { início: manha.início, fim: tarde.fim };
    } else if (manha.ativo) {
        return { início: manha.início, fim: manha.fim };
    } else {
        return { início: tarde.início, fim: tarde.fim };
    }
}


/** @type {(horario: string) => number} */
export function horárioEmMinutos(horario) {
    let { horas, minutos } = horárioTextoParaObjeto(horario);
    return horas * 60 + minutos;
}


/** @type {(horario: string) => Horário} */
export function horárioTextoParaObjeto(horario) {
    let [horas, minutos] = horario.split(":");
    return { horas: Number(horas), minutos: Number(minutos) };
}


/** @type {(minutos: Hora) => string} */
export function minutosEmTexto(horárioEmMinutos) {
    if (horárioEmMinutos > 0) {
        let hora = Math.floor(horárioEmMinutos / 60);
        let minutos = horárioEmMinutos - hora * 60;

        // Converte para Texto, coloca zero à esquerda
        let h = `${hora}`.padStart(2, '0');
        let m = `${minutos}`.padStart(2, '0');

        return `${h}:${m}`;
    } else {
        return "00:00";
    }
}


/** @type {(lista: Tempos) => Tempos} */
export function ordenaPorHoraInicial(lista) {
    if (lista.length > 1) {
        return lista.sort(comparaPorHoraInicial);
    } else {
        return lista;
    }
}