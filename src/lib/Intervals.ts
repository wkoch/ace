import { contains, isTimeBetween, stringToTime } from "./Time";
import { orderByStartTime } from "./Helpers";
import { Type } from "../lib/Types";
import type { Afternoon, Interval, Intervals, Morning } from "../lib/Types";

export function getLunchInterval(
  morning: Morning,
  afternoon: Afternoon
): Interval {
  if (morning.active && afternoon.active) {
    return {
      type: Type.Lunch,
      start: stringToTime(morning.end),
      stop: stringToTime(afternoon.begin),
    };
  } else {
    return { type: Type.Lunch, start: 0, stop: 0 };
  }
}

export function newInterval(
  intervals: Intervals,
  newInterval: Interval
): Intervals {
  let result: Intervals = [];
  let intercedes = false;
  let ignore = false;

  if (intervals.length > 0) {
    intervals.forEach((interval) => {
      if (contains(interval, newInterval)) {
        // Intervalo cobre novo Intervalo, salva o intervalo
        result.push(interval);
        intercedes = true;
        ignore = true;
      } else if (contains(newInterval, interval)) {
        // Novo intervalo cobre intervalo existente
        if (interval.type == Type.Lunch) {
          // Quebra chuvas em volta do almoço
          let first = { ...newInterval };
          let second = { ...newInterval };
          first.stop = interval.start;
          result.push(first);
          result.push(interval);
          second.start = interval.stop;
          result.push(second);
          intercedes = true;
          ignore = true;
        } else {
          // salva o novo
          intercedes = true;
        }
      } else if (
        newInterval.start < interval.start &&
        isTimeBetween(newInterval.stop, interval.start, interval.stop)
      ) {
        // Novo intervalo intercede intervalo existente
        if (interval.type == Type.Lunch) {
          newInterval.stop = interval.start;
          result.push(interval); // Salva o almoço
          intercedes = true;
        } else {
          newInterval.stop = interval.stop;
          intercedes = true;
        }
      } else if (
        isTimeBetween(newInterval.start, interval.start, interval.stop) &&
        newInterval.stop > interval.stop
      ) {
        // Novo intervalo extrapola intervalo existente
        if (interval.type == Type.Lunch) {
          newInterval.start = interval.stop;
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

export function joinIntervals(lunch: Intervals, rains: Intervals) {
  if (lunch.length == 1) {
    let result = [...lunch];
    if (rains.length > 0) {
      rains.forEach((rain) => {
        newInterval(result, rain);
      });
    }
    return result;
  } else {
    return rains;
  }
}
