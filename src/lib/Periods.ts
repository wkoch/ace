import type {
  Afternoon,
  Day,
  Morning,
  Inspection,
  Inspections,
  Intervals,
  Period,
  Periods,
} from "../lib/Types";
import { Type } from "../lib/Types";
import { contains, isTimeBetween, stringToTime, timeToString } from "./Time";
import { TEXT } from "../data/Data";

export function getDayPeriod(morning: Morning, afternoon: Afternoon): Day {
  let result: Day = {
    start: stringToTime(morning.begin),
    stop: stringToTime(afternoon.end),
  };
  if (morning.active && !afternoon.active) {
    result.stop = stringToTime(morning.end);
  } else if (!morning.active && afternoon.active) {
    result.start = stringToTime(afternoon.begin);
  }
  return result;
}

export function subtractIntervals(day: Day, intervals: Intervals): Periods {
  let newDay: Day = { ...day };
  let periods: Periods = [];

  if (intervals.length > 0) {
    intervals.forEach((interval, index) => {
      if (contains(newDay, interval)) {
        // Interval is inside a period.
        periods.push({
          index: periods.length,
          start: newDay.start,
          stop: interval.start,
          span: interval.start - newDay.start,
        });
        newDay.start = interval.stop;
      } else if (
        interval.start < newDay.start &&
        isTimeBetween(interval.start, newDay.start, newDay.stop)
      ) {
        // Interval starts before and ends inside the period.
        newDay.start = interval.stop;
      } else if (
        isTimeBetween(interval.start, newDay.start, newDay.stop) &&
        interval.stop > newDay.stop
      ) {
        // Interval starts during and ends after the period.
        newDay.stop = interval.start;
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
    periods.push({
      index: periods.length,
      start: newDay.start,
      stop: newDay.stop,
      span: newDay.stop - newDay.start,
    });
  } else {
    periods.push({
      index: periods.length,
      start: newDay.start,
      stop: newDay.stop,
      span: newDay.stop - newDay.start,
    });
    return periods;
  }
  return periods;
}
