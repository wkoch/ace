import type { Time, Type } from "../lib/Types";

export function compareByIndex(first: {index: number}, second: {index: number}): number {
  if (first.index > second.index) {
    return 1;
  } else if (first.index < second.index) {
    return -1;
  }
  return 0;
}

export function compareByStartTime(first: Time, second: Time): number {
  if (first.start > second.start) {
    return 1;
  } else if (first.start < second.start) {
    return -1;
  }
  return 0;
}

export function countByType(list: any, type: Type): number {
  return filter(list, type).length;
}

export function filter(list: any, type: Type): any {
  return list.filter((obj: { type: Type }) => obj.type == type);
}

export function filterOut(list: any, type: Type): any {
  return list.filter((obj: { type: Type }) => obj.type != type);
}

export function orderByIndex(list: any[]): any[] {
  if (list.length > 1) {
    return list.sort(compareByIndex);
  } else {
    return list;
  }
}

export function orderByStartTime(list: any[]): any[] {
  if (list.length > 1) {
    return list.sort(compareByStartTime);
  } else {
    return list;
  }
}
