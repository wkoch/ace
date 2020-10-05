/**
 * @typedef { import("./Type").Morning } Morning
 * @typedef { import("./Type").Afternoon } Afternoon
 * @typedef { import("./Type").Moment } Moment
 * @typedef { import("./Type").Moments } Moments
 * @typedef { import("./Type").Interval } Interval
 * @typedef { import("./Type").Intervals } Intervals
 */

import { TEXT } from "../data/Data";
import { contains, orderByStartSchedule } from "./Helpers";
import { isScheduleBetween } from "./Time";


/** @type {(rains: Intervals, morning: Morning, afternoon: Afternoon) => Intervals} */
export function processIntervals(rains, morning, afternoon) {
    /** @type {Intervals} */
    let intervals = [];
    /** @type {Interval} */
    let lunch = { type: TEXT.LUNCH, start: 0, end: 0 };

    if (morning.active && afternoon.active) {
        // There's a lunch interval when working the whole day.
        lunch.start = morning.end;
        lunch.end = afternoon.start;
        intervals.push(lunch);

        if (rains.length > 0) {
            rains.forEach(rain => {
                /** @type {Interval} */
                let newRains = { ...rain };
                if (isScheduleBetween(rain.start, morning.start, morning.end) && isScheduleBetween(rain.end, lunch.start, lunch.end)) {
                    // Starts in the morning and ends during Lunch.
                    newRains.end = lunch.start;
                    intervals.push(newRains);
                } else if (isScheduleBetween(rain.start, morning.start, morning.end) && isScheduleBetween(rain.end, afternoon.start, afternoon.end)) {
                    // Starts in the morning and ends during afternoon.

                    // Splits into two blocks...
                    // One before lunch...
                    newRains.end = lunch.start;
                    intervals.push(newRains);
                    // and the other after lunch.
                    newRains.start = lunch.end;
                    newRains.end = rain.end;
                    intervals.push(newRains);
                } else if (isScheduleBetween(rain.start, lunch.start, lunch.end) && isScheduleBetween(rain.end, lunch.start, lunch.end)) {
                    // Starts and ends during lunch.
                    // Ignore this rain block.
                } else if (isScheduleBetween(rain.start, lunch.start, lunch.end) && isScheduleBetween(rain.end, afternoon.start, afternoon.end)) {
                    // Starts during lunch and ends in the afternoon.
                    newRains.start = lunch.end;
                    intervals.push(newRains);
                } else {
                    // Starts and ends during any period.
                    intervals.push(newRains);
                }
            });
        }
    } else {
        // First rain block.
        if (rains.length > 0) {
            rains.forEach(rain => {
                intervals.push(rain);
            });
        }
    }

    if (rains.length > 1) {
        // Order only when there's more than one rain block.
        return orderByStartSchedule(intervals);
    } else {
        return intervals;
    }
}


/** @type {(day: Moment, intervals: Intervals) => Moments} */
export function subtractIntervalsFromDaySchedule(day, intervals) {
    /** @type {Moment} */
    let newDay = { ...day };

    /** @type {Moments} */
    let moments = [];

    if (intervals.length > 0) {
        intervals.forEach(interval => {
            if (contains(interval, newDay)) {
                // Interval is inside a period.
                moments.push({
                    start: newDay.start,
                    end: interval.start
                })
                newDay.start = interval.end;
            } else if (interval.start < newDay.start && interval.end > newDay.start && interval.end < newDay.end) {
                // Interval starts before and ends inside the period.
                newDay.start = interval.end;
            } else if (isScheduleBetween(interval.start, newDay) && interval.end > newDay.end) {
                // Interval starts during and ends after the period.
                newDay.end = interval.start;
            } else if (contains(newDay, interval)) {
                // Interval covers the whole day.
                moments = [];
                return moments;
            } else {
                // Ingore periods completely outside the day time.
                return moments;
            }
        });
        // Saves the last period, the one after the last interval subtraction.
        moments.push(newDay);
    } else {
        moments.push(newDay);
        return moments;
    }
    return moments;
}