/**
 * @typedef { import("../lib/Types").Inspection } Inspection
 * @typedef { import("../lib/Types").Interval } Interval
 * @typedef { import("../lib/Types").Period } Period
 */


/** @type {(first: Inspection | Interval | Period, second: Inspection | Interval | Period) => boolean} */
export function contains(first, second) {
    return (isTimeBetween(second.start, first.start, first.end) && isTimeBetween(second.end, first.start, first.end));
}


/** @type {(time: number, start: number, end: number) => boolean} */
export function isTimeBetween(time, start, end) {
    return (time >= start && time <= end);
}


/** @type {(timeString: string) => number} */
export function stringToTime(timeString) {
    if (timeString == "" || timeString == "00:00") {
        return 0;
    } else {
        const [h, m] = timeString.split(":");
        const hour = Number(h) * 60 * 60 * 1000;
        const minutes = Number(m) * 60 * 1000;
        return hour + minutes;
    }
}


/** @type {(time: number) => string} */
export function timeToString(time) {
    if (time > 0) {
        let hora = Math.floor(time / 1000 / 60 / 60);
        let minutes = Math.floor((time - hora * 60 * 60 * 1000) / 1000 / 60);

        // Converte para Texto, coloca zero à esquerda
        let h = `${hora}`.padStart(2, '0');
        let m = `${minutes}`.padStart(2, '0');

        return `${h}:${m}`;
    } else {
        return "00:00";
    }
}