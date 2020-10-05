/**
 * @typedef { import("./Type").Minutes } Minutes
 * @typedef { import("./Type").Interval } Interval
 * @typedef { import("./Type").Intervals } Intervals
 * @typedef { import("./Type").Periods } Periods
 * @typedef { import("./Type").Schedules } Schedules
 * @typedef { import("./Type").Inspection } Inspection
 * @typedef { import("./Type").Inspections } Inspections
 */

import { ICON, TIME, TYPE } from "../data/Data";
import { orderByStartSchedule } from "./Helpers";
import { isScheduleBetween } from "./Time";


/** @type {(inspection: Inspection, average: number) => Minutes} */
export function inspectionDuration(inspection, average) {
    if (inspection.type == TYPE.CLOSED) {
        return TIME.CLOSED;
    } else if (inspection.type == TYPE.NORMAL || inspection.type == TYPE.RECOVERED) {
        return average;
    }
}


// FIXME:
// /** @type {(inspections: Inspections, periods: Periods, average: number) => Inspections} */
// export function updateInspectionsSchedule(inspections, periods, average) {
//     /** @type {Inspections} */
//     let newInspections = [];
//     /** @type {number} */
//     let counter = 0;

//     periods.forEach(period => {
//         /** @type {Minutes} */
//         let currentStart = period.start;

//         if (isScheduleBetween(currentStart, period)) {
//             inspections.forEach(inspection => {
//                 /** @type {Minutes} */
//                 let endingSchedule = currentStart + inspectionDuration(inspection, average);
//                 newInspections.push({
//                     id: counter,
//                     period: period.period,
//                     type: inspection.type,
//                     start: currentStart,
//                     end: endingSchedule
//                 })
//                 counter += 1;
//                 currentStart = endingSchedule;
//             });
//         }
//     });

//     return newInspections;
// }

/** @type {(inspections: Inspections, intervals: Intervals) => Schedules} */
export function makeReport(inspections, intervals) {
    return orderByStartSchedule([...inspections, ...intervals]);
}

export function inspectionIcon(inspection) {
    switch (inspection.type) {
        case TYPE.NORMAL:
            return ICON.NORMAL;
        case TYPE.CLOSED:
            return ICON.CLOSED;
        case TYPE.RECOVERED:
            return ICON.RECOVERED;
        case TYPE.RAIN:
            return ICON.RAIN;
        case TYPE.LUNCH:
            return ICON.LUNCH;
            break;
        default:
            return "";
            break;
    }
}