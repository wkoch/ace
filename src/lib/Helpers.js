/**
 * @typedef { import("../lib/Types").TYPE } TYPE
 * @typedef { import("../lib/Types").Period } Period
 * @typedef { import("../lib/Types").Periods } Periods
 * @typedef { import("../lib/Types").Interval } Interval
 * @typedef { import("../lib/Types").Intervals } Intervals
 * @typedef { import("../lib/Types").Inspection } Inspection
 * @typedef { import("../lib/Types").Inspections } Inspections
 */


/** @type {(first: Inspection | Interval | Period, second: Inspection | Interval | Period) => number} */
export function compareByStartTime(first, second) {
    if (first.start > second.start) {
        return 1;
    } else if (first.start < second.start) {
        return -1;
    }
    return 0;
}


/** @type {(list: Inspections, type: TYPE) => number} */
export function countByType(list, type) {
    return filter(list, type).length;
}


/** @type {(list: Inspections, type: TYPE) => Intervals} */
export function filter(list, type) {
    return list.filter(obj => obj.type == type);
}


/** @type {(list: Inspections | Intervals | Periods) => Inspections | Intervals | Periods} */
export function orderByStartTime(list) {
    if (list.length > 1) {
        return list.sort(compareByStartTime);
    } else {
        return list;
    }
}