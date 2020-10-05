/**
 * @typedef { import("./Type").Type } Type
 * @typedef { import("./Type").Schedules } Schedules
 * @typedef { import("./Type").Interval } Interval
 * @typedef { import("./Type").Intervals } Intervals
 * @typedef { import("./Type").Inspections } Inspections
 */

import { TEXT } from "../data/Data";
import { contains, orderByStartSchedule } from "./Helpers"
import { isScheduleBetween } from "./Time"

/** @type {(intervals: Intervals, newOne: Interval) => Schedules} */
export function addRain(intervals, newOne) {
    /** @type {Intervals} */
    let newIntervals = [];
    /** @type {boolean} */
    let overlaped = false;

    if (intervals.length > 0) {
        intervals.forEach(interval => {
            /** @type {Intervals} */
            let matched = intervals.filter(function (element) {
                return element.end == interval.start;
            });
            if (matched.length > 0) {
                // Join continuous blocks
                matched[0].end = interval.end;
                newIntervals.push(matched[0]);
            } else {
                /** @type {Interval} */
                let newOneChuva = interval;
                // Join intersecting blocks
                if (contains(newOne, interval)) {
                    // An existing interval already contains the New one.
                    newIntervals.push(interval);
                    overlaped = true;
                } else if (contains(interval, newOne)) {
                    // An existing interval is contained in the New one.
                    newIntervals.push(newOne);
                    overlaped = true;
                } else if (isScheduleBetween(newOne.start, interval) && newOne.end > interval.end) {
                    // New one begins before and ends after an existing interval.
                    newOneChuva.end = newOne.end;
                    newIntervals.push(interval);
                    overlaped = true;
                } else if (newOne.start < interval.start && isScheduleBetween(newOne.end, interval)) {
                    // New one begins before and ends inside an existing interval.
                    newOneChuva.start = newOne.start;
                    newIntervals.push(interval);
                    overlaped = true;
                } else {
                    // New one doesn't overlap with existing intervals.
                    newIntervals.push(interval);
                }
            }
        });
    }

    if (!overlaped) {
        newIntervals.push(newOne);
    }

    return orderByStartSchedule(newIntervals);
}


/** @type {(inspections: Inspections, type: Type) => Inspections} */
export function addInspection(inspections, type) {
    return [...inspections, { id: inspections.length, period: TEXT.MORNING, type: type, start: 0, end: 0 }];
}