/**
 * @typedef { import("../lib/Types").Morning } Morning
 * @typedef { import("../lib/Types").Afternoon } Afternoon
 * @typedef { import("../lib/Types").Period } Period
 * @typedef { import("../lib/Types").Periods } Periods
 * @typedef { import("../lib/Types").Interval } Interval
 * @typedef { import("../lib/Types").Intervals } Intervals
 * @typedef { import("../lib/Types").Inspection } Inspection
 * @typedef { import("../lib/Types").Inspections } Inspections
 */


/** @type {(a: Period | Interval | Inspection, b: Period | Interval | Inspection) => number} */
export function compareByStartTime(a, b) {
    /** @type {number} */
    const elementoA = a.start;
    /** @type {number} */
    const elementoB = b.start;

    if (elementoA > elementoB) {
        return 1;
    } else if (elementoA < elementoB) {
        return -1;
    }
    return 0;
}


/** @type {(list: Periods | Intervals | Inspections) => Periods | Intervals | Inspections} */
export function orderByStartTime(list) {
    if (list.length > 1) {
        return list.sort(compareByStartTime);
    } else {
        return list;
    }
}