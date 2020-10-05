/**
 * @typedef { import("./Type").Minutes } Minutes
 * @typedef { import("./Type").Morning } Morning
 * @typedef { import("./Type").Afternoon } Afternoon
 * @typedef { import("./Type").Schedule } Schedule
 * @typedef { import("./Type").Schedule } Schedule
 * @typedef { import("./Type").Moment } Moment
 */


/** @type {(h: Minutes, a: (Minutes | Moment), b: Minutes) => boolean} */
export function isScheduleBetween(h, a, b = 0) {
    if (typeof a == "object") {
        // Compares a number with and object
        return (h >= a.start && h <= a.end);
    } else {
        // Compares numbers
        return (h >= a && h <= b);
    }
}


/** @type {(manha: Morning, afternoon: Afternoon) => Moment} */
export function daySchedule(morning, afternoon) {
    if (morning.active && afternoon.active) {
        return { start: morning.start, end: afternoon.end };
    } else if (morning.active) {
        return { start: morning.start, end: morning.end };
    } else {
        return { start: afternoon.start, end: afternoon.end };
    }
}


/** @type {(time: string) => number} */
export function timeInMinutes(time) {
    if (time == "") {
        return 0;
    } else {
        let { hours, minutes } = timeTextToObject(time);
        return hours * 60 + minutes;
    }
}


/** @type {(time: string) => Schedule} */
export function timeTextToObject(time) {
    let [hours, minutes] = time.split(":");
    return { hours: Number(hours), minutes: Number(minutes) };
}


/** @type {(minutes: Minutes) => string} */
export function minutesToText(timeInMinutes) {
    if (timeInMinutes > 0) {
        let hora = Math.floor(timeInMinutes / 60);
        let minutes = timeInMinutes - hora * 60;

        // Converte para Texto, coloca zero à esquerda
        let h = `${hora}`.padStart(2, '0');
        let m = `${minutes}`.padStart(2, '0');

        return `${h}:${m}`;
    } else {
        return "00:00";
    }
}


