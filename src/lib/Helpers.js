/**
 * @typedef { import("./Type").Minutes } Minutes
 * @typedef { import("./Type").Interval } Interval
 * @typedef { import("./Type").Periods } Periods
 * @typedef { import("./Type").Reports } Reports
 * @typedef { import("./Type").Schedule } Schedule
 * @typedef { import("./Type").Schedules } Schedules
 * @typedef { import("./Type").Type } Type
 * @typedef { import("./Type").Inspection } Inspection
 * @typedef { import("./Type").Inspections } Inspections
 */

import { ICON, TEXT, TYPE } from "../data/Data";
import { isScheduleBetween } from "./Time";


/** @type {(a: Schedule, b: Schedule) => number} */
export function compareByStartSchedule(a, b) {
    /** @type {Minutes} */
    const elementoA = a.start;
    /** @type {Minutes} */
    const elementoB = b.start;

    if (elementoA > elementoB) {
        return 1;
    } else if (elementoA < elementoB) {
        return -1;
    }
    return 0;
}


/** @type {(first: Schedule, second: Schedule) => boolean} */
export function contains(first, second) {
    return (isScheduleBetween(second.start, first) && isScheduleBetween(second.end, first));
}


/** @type {(list: Array<any>, type: Type) => number} */
export function countByType(list, type) {
    return filter(list, type).length;
}


/** @type {(list: Array<any>, type: Type) => Array<any>} */
export function filter(list, type) {
    return list.filter(obj => obj.type == type);
}


/** @type {(list: Schedules) => Schedules} */
export function orderByStartSchedule(list) {
    if (list.length > 1) {
        return list.sort(compareByStartSchedule);
    } else {
        return list;
    }
}