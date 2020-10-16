import type {
  Inspection,
  Inspections,
  Intervals,
  Period,
  Periods,
  Times,
  Time,
} from "../lib/Types";
import { Type } from "../lib/Types";
import { TEXT, TIME } from "../data/Data";
import { countByType } from "./Helpers";
import { getTimeSpan } from "./Time";

export function finalReport(
  simpleReport: Inspections,
  periods: Periods
): Inspections {
  let finishedReport = [];

  periods.forEach((period) => {
    finishedReport = [
      ...finishedReport,
      ...improvePrecision(simpleReport, period),
    ];
  });

  return finishedReport;
}

export function getAverage(inspections: Inspections, periods: Periods): number {
  const N = countByType(inspections, Type.Normal);
  const F = countByType(inspections, Type.Closed);
  const R = countByType(inspections, Type.Recovered);

  return (getTimeSpan(periods) - F * TIME.CLOSED) / (N + R);
}

export function improvePrecision(
  simpleReport: Inspections,
  ogPeriod: Period
): Inspections {
  let report = [];
  let period = { ...ogPeriod };
  const inspections = simpleReport.filter((el) => el.period == period.index);

  const thisAverage = getAverage(inspections, [period]);
  const periodAverage = Math.floor(thisAverage);
  const decimals = thisAverage - periodAverage;
  let decimalsAccumulator = 0;
  let first = true;
  let previous;

  inspections.forEach((inspection) => {
    decimalsAccumulator += decimals;
    let sum = 0;
    if (decimalsAccumulator > 1) {
      sum = 1;
      decimalsAccumulator -= 1;
    } else {
      sum = 0;
    }
    const currentDuration =
      inspection.type == Type.Closed ? TIME.CLOSED : periodAverage;
    let current: Inspection;
    if (first) {
      current = {
        index: inspection.index,
        type: inspection.type,
        period: inspection.period,
        start: period.start,
        stop: Math.floor(period.start + currentDuration + sum),
      };
      first = false;
    } else {
      current = {
        index: inspection.index,
        type: inspection.type,
        period: inspection.period,
        start: period.start,
        stop: Math.floor(period.start + currentDuration + sum),
      };
    }
    report.push(current);
    previous = { ...current };
    period.start = previous.stop;
  });
  return report;
}

export function makeReport(
  inspections: Inspections,
  periods: Periods
): Inspections {
  let report = [];
  let changePeriod = false;
  const periodsCount = periods.length;
  let periodIndex = 0;
  let period = { ...periods[periodIndex] };
  let first = true;
  let previous;

  if (inspections.length > 0) {
    let average = getAverage(inspections, periods);
    inspections.forEach((inspection) => {
      let currentSpan = inspection.type == Type.Closed ? TIME.CLOSED : average;
      let current: Inspection;
      if (first) {
        current = {
          index: inspection.index,
          type: inspection.type,
          period: periodIndex,
          start: period.start,
          stop: Math.floor(period.start + currentSpan),
        };
        first = false;
      } else if (changePeriod) {
        periodIndex += 1;
        period = { ...periods[periodIndex] };
        current = {
          index: inspection.index,
          type: inspection.type,
          period: periodIndex,
          start: period.start,
          stop: Math.floor(period.start + currentSpan),
        };
        changePeriod = false;
      } else {
        if (
          periodIndex + 1 < periodsCount &&
          previous.stop < period.stop &&
          previous.stop + currentSpan > period.stop
        ) {
          changePeriod = true;
        }
        current = {
          index: inspection.index,
          type: inspection.type,
          period: periodIndex,
          start: previous.stop,
          stop: Math.floor(previous.stop + currentSpan),
        };
      }
      report.push(current);
      previous = { ...current };
      period.start = previous.stop;
    });
  }
  return report;
}
