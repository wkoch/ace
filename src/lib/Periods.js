/**
* @typedef { import("../lib/Types").Period } Period
*/

import { TEXT } from "../data/Data";


/** @type {(morning: Period, afternoon: Period) => Period} */
export function getInitialPeriod(morning, afternoon) {
    let result;
    if (morning.active && afternoon.active) {
        result = { ...morning };
        result.end = afternoon.end;
        result.endTime = afternoon.endTime;
        result.span = morning.span + afternoon.span;
        result.nextInterval = TEXT.LUNCH;
    } else if (morning.active) {
        result = { ...morning };
        result.nextInterval = TEXT.NONE;
    } else {
        result = { ...afternoon }
        result.nextInterval = TEXT.NONE;
    }
    return result;
}