import type {
  Inspection,
  Inspections,
  Interval,
  Period,
  Periods,
  Times,
  Time,
} from "./Types";
import { Type } from "./Types";

export function contains(first: Time, second: Time): boolean {
  return (
    isTimeBetween(second.start, first.start, first.stop) &&
    isTimeBetween(second.stop, first.start, first.stop)
  );
}

export function getTimeSpan(times: Times): number {
  let span = 0;
  times.forEach((time) => {
    span += time.stop - time.start;
  });

  return span;
}

export function isTimeBetween(
  time: number,
  start: number,
  stop: number
): boolean {
  return time >= start && time <= stop;
}

export function stringToTime(time: string): number {
  if (time == "" || time == "00:00") {
    return 0;
  } else {
    const [h, m] = time.split(":");
    const hour = Number(h) * 60 * 60 * 1000;
    const minutes = Number(m) * 60 * 1000;
    return hour + minutes;
  }
}

export function timeToString(time: number): string {
  if (time > 0) {
    let hora = Math.floor(time / 1000 / 60 / 60);
    let minutes = Math.floor((time - hora * 60 * 60 * 1000) / 1000 / 60);

    // Converte para Texto, coloca zero à esquerda
    let h = `${hora}`.padStart(2, "0");
    let m = `${minutes}`.padStart(2, "0");

    return `${h}:${m}`;
  } else {
    return "00:00";
  }
}
