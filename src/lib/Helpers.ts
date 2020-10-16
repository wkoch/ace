import type { hasType, Time, Type } from "../lib/Types";

export function compareByStartTime(first: Time, second: Time): number {
  if (first.start > second.start) {
    return 1;
  } else if (first.start < second.start) {
    return -1;
  }
  return 0;
}

export function countByType(list: hasType, type: Type): number {
  return filter(list, type).length;
}

export function filter(list: hasType, type: Type): hasType {
  return list.filter((obj: { type: Type }) => obj.type == type);
}

export function orderByStartTime(list: any[]): any[] {
  if (list.length > 1) {
    return list.sort(compareByStartTime);
  } else {
    return list;
  }
}
