/**
 * @typedef { import("./Type").Minutes } Minutes
 * @typedef { import("./Type").Morning } Morning
 * @typedef { import("./Type").Afternoon } Afternoon
 * @typedef { import("./Type").Moment } Moment
 * @typedef { import("./Type").Moments } Moments
 * @typedef { import("./Type").Periods } Periods
 * @typedef { import("./Type").Interval } Interval
 */

import { TEXT, TIME, TYPE } from "../data/Data";
import { daySchedule } from "./Time";
import { contains } from "./Helpers";
import { processIntervals, subtractIntervalsFromDaySchedule } from "./Interval";



/** @type {(moments: Moments, morning: Morning, afternoon: Afternoon) => Periods} */
export function updateInspectionsPeriods(moments, morning, afternoon) {
    /** @type {Periods} */
    let newPeriods = [];

    moments.forEach(moment => {
        if (contains(moment, morning)) {
            newPeriods.push({
                period: TEXT.MORNING,
                start: moment.start,
                end: moment.end
            });
        } else {
            newPeriods.push({
                period: TEXT.AFTERNOON,
                start: moment.start,
                end: moment.end
            });
        }
    });

    return newPeriods;
}


/** @type {(morning: Morning, afternoon: Afternoon, rains: Intervals) => Periods} */
export function processPeriods(morning, afternoon, rains) {
    /** @type {Moment} */
    const day = daySchedule(morning, afternoon);

    /** @type {Interval} */
    const intervals = processIntervals(rains, morning, afternoon);

    /** @type {Moments} */
    const moments = subtractIntervalsFromDaySchedule(day, intervals);

    /** @type {Periods} */
    const periods = updateInspectionsPeriods(moments, morning, afternoon);

    return periods;
}


/** @type {(periods: Periods) => Minutes} */
export function periodsDuration(periods) {
    /** @type {Minutes} */
    let duration = 0;

    periods.forEach(period => {
        duration += period.end - period.start;
    });

    return duration;
}


/** @type {(periods: Periods, normal: number, closed: number, recovered: number) => Minutes} */
export function médiaGeral(periods, normal, closed, recovered) {
    /** @type {Minutes} */
    const duration = periodsDuration(periods);

    return (duration - closed * TIME.CLOSEDS) / (normal + recovered - 1);
}