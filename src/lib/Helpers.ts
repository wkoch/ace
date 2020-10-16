import type {
  Inspection,
  Inspections,
  Interval,
  Intervals,
  Period,
  Periods,
  Time,
  Times,
  Type,
} from "../lib/Types";

export function compareByStartTime(first: Time, second: Time): number {
  if (first.start > second.start) {
    return 1;
  } else if (first.start < second.start) {
    return -1;
  }
  return 0;
}

export function countByType(list: Inspections | Intervals, type: Type): number {
  return filter(list, type).length;
}

export function filter(
  list: (Inspection | Interval)[],
  type: Type
): (Inspection | Interval)[] {
  return list.filter((obj: { type: Type }) => obj.type == type);
}

export function orderByStartTime(list: Times): Times {
  if (list.length > 1) {
    return list.sort(compareByStartTime);
  } else {
    return list;
  }
}
