/**
* @typedef { import("../lib/Types").Intervals } Intervals
* @typedef { import("../lib/Types").Period } Period
* @typedef { import("../lib/Types").Periods } Periods
*/

import { contains, isTimeBetween, timeToString } from "./Time";
import { TEXT } from "../data/Data";


/** @type {(morning: Period, afternoon: Period) => Period} */
export function getInitialPeriod(morning, afternoon) {
    let result;
    if (morning.active && afternoon.active) {
        result = { ...morning };
        result.end = afternoon.end;
        result.endTime = afternoon.endTime;
        result.span = morning.span + afternoon.span;
        result.nextInterval = 0;
    } else if (morning.active) {
        result = { ...morning };
        result.nextInterval = null;
    } else {
        result = { ...afternoon }
        result.nextInterval = null;
    }
    return result;
}


/** @type {(day: Period, intervals: Intervals) => Periods} */
export function subtractIntervalsFromDay(day, intervals) {
    /** @type {Period} */
    let newDay = { ...day };

    /** @type {Periods} */
    let periods = [];

    if (intervals.length > 0) {
        intervals.forEach((interval, index) => {
            if (contains(newDay, interval)) {
                // Interval is inside a period.
                periods.push({
                    name: newDay.name,
                    active: true,
                    startTime: newDay.startTime,
                    endTime: timeToString(interval.start),
                    start: newDay.start,
                    end: interval.start,
                    span: interval.start - newDay.start,
                    nextInterval: index
                })
                if (interval.type == TEXT.LUNCH) {
                    newDay.name = TEXT.AFTERNOON;
                }
                newDay.startTime = timeToString(interval.end);
                newDay.start = interval.end;
                newDay.span = newDay.end - newDay.start;
            } else if (interval.start < newDay.start && isTimeBetween(interval.start, newDay.start, newDay.end)) {
                // Interval starts before and ends inside the period.
                newDay.start = interval.end;
                newDay.startTime = timeToString(interval.start);
            } else if (isTimeBetween(interval.start, newDay.start, newDay.end) && interval.end > newDay.end) {
                // Interval starts during and ends after the period.
                newDay.end = interval.start;
                newDay.endTime = timeToString(interval.start);
            } else if (contains(interval, newDay)) {
                // Interval covers the whole day.
                periods = [];
                return periods;
            } else {
                // Ingore periods completely outside the day time.
                return periods;
            }
        });
        // Saves the last period, the one after the last interval subtraction.
        periods.push(newDay);
    } else {
        periods.push(newDay);
        return periods;
    }
    return periods;
}