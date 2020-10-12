/**
 * @typedef { import("../lib/Types").Morning } Morning
 * @typedef { import("../lib/Types").Afternoon } Afternoon
 * @typedef { import("../lib/Types").Period } Period
 * @typedef { import("../lib/Types").Interval } Interval
 * @typedef { import("../lib/Types").Intervals } Intervals
 */
import { TEXT } from "../data/Data";
import { contains, isTimeBetween } from "../lib/Time";
import { orderByStartTime } from "../lib/Helpers";


/** @type {(morning: Period, afternoon: Period) => Interval} */
export function getLunchInterval(morning, afternoon) {
    if (morning.active && afternoon.active) {
        return { type: TEXT.LUNCH, start: morning.end, end: afternoon.start };
    } else {
        return { type: TEXT.LUNCH, start: 0, end: 0 };
    }
}


/** @type {(intervals: Intervals, newInterval: Interval) => Intervals} */
export function newInterval(intervals, newInterval) {
    /** @type {Intervals} */
    let result = [];
    /** @type {boolean} */
    let intercedes = false;
    let ignore = false;

    if (intervals.length > 0) {
        intervals.forEach(interval => {
            if (contains(interval, newInterval)) {
                // Intervalo cobre novo Intervalo, salva o intervalo
                result.push(interval);
                intercedes = true;
                ignore = true;
            } else if (contains(newInterval, interval)) {
                // Novo intervalo cobre intervalo existente
                if (interval.type == TEXT.LUNCH) {
                    // Quebra chuvas em volta do almoço
                    let first = { ...newInterval };
                    let second = { ...newInterval };
                    first.end = interval.start;
                    result.push(first);
                    result.push(interval);
                    second.start = interval.end;
                    result.push(second);
                    intercedes = true;
                    ignore = true;
                } else {
                    // salva o novo
                    intercedes = true;
                }
            } else if (newInterval.start < interval.start && isTimeBetween(newInterval.end, interval.start, interval.end)) {
                // Novo intervalo intercede intervalo existente
                if (interval.type == TEXT.LUNCH) {
                    newInterval.end = interval.start;
                    result.push(interval); // Salva o almoço
                    intercedes = true;
                } else {
                    newInterval.end = interval.end;
                    intercedes = true;
                }
            } else if (isTimeBetween(newInterval.start, interval.start, interval.end) && newInterval.end > interval.end) {
                // Novo intervalo extrapola intervalo existente
                if (interval.type == TEXT.LUNCH) {
                    newInterval.start = interval.end;
                    result.push(interval); // Salva o almoço
                    intercedes = true;
                } else {
                    newInterval.start = interval.start;
                    intercedes = true;
                }
            } else {
                result.push(interval);
            }
        });

        if (!ignore) {
            result.push(newInterval);
        }
    } else {
        result.push(newInterval);
    }

    return orderByStartTime(result);
}