/**
 * @typedef { import("../lib/Types").Morning } Morning
 * @typedef { import("../lib/Types").Afternoon } Afternoon
 * @typedef { import("../lib/Types").Period } Period
 * @typedef { import("../lib/Types").Interval } Interval
 * @typedef { import("../lib/Types").Intervals } Intervals
 */
import { TEXT } from "../data/Data";
import { isTimeBetween } from "../lib/Time";


/** @type {(morning: Period, afternoon: Period) => Interval} */
export function getLunchInterval(morning, afternoon) {
    if (morning.active && afternoon.active) {
        return { type: TEXT.LUNCH, start: morning.end, end: afternoon.start };
    } else {
        return { type: TEXT.LUNCH, start: 0, end: 0 };
    }
}


// /** @type {(intervals: Intervals) => Intervals} */
// export function addInterval(intervals, newInterval) {
//     let result = [];

//     intervals.forEach(interval => {
//         if (isTimeBetween(newInterval.start, interval.start, interval.end)) {
//             if (interval.type == newInterval.type) {
//                 let unify = { ...interval };
//                 unify.end = newInterval.end;
//                 result.push(unify);
//             } else if (interval.type == TEXT.RAIN && newInterval.type == TEXT.LUNCH) {
//                 let adjustRainBefore = { ...interval };
//                 adjustRainBefore.end = newInterval.start;
//                 result.push(adjustRainBefore);
//                 result.push(newInterval);
//             } else if (interval.type == TEXT.LUNCH && newInterval.type == TEXT.RAIN) {
//                 let adjustRainAfter = { ...newInterval };
//                 adjustRainAfter.start = interval.end;
//                 result.push(interval);
//                 result.push(adjustRainAfter);
//             }
//         } else if (interval.end < interval.start) {
//             // Ignore inverted interval
//         } else if ()
//     });

// }