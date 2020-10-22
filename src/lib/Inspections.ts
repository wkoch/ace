import { countByType, filter, filterOut, orderByIndex } from "./Helpers";
import { getTimeSpan } from "./Time";
import { TIME } from "../data/Data";
import { Type } from "../lib/Types";
import type { Inspection, Inspections, Intervals, Period, Periods, Report } from "../lib/Types";

export function finalReport(inspections: Inspections, intervals: Intervals): Report {
  let report: Report = [];
  let previous = 0;
  let current = 0;
  if (intervals.length > 0) {
    inspections.forEach(inspection => {
      previous = current;
      current = inspection.period;
      if (previous != current) {
        report.push(intervals[previous]);
      }
      report.push(inspection);
    });
    return report;
  } else {
    return inspections;
  }
}

export function preciseReport(
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

  // Move recovered inspections to the end of the list to calculate time
  let recovered: Inspections = filter(inspections, Type.Recovered);
  let rest: Inspections = filterOut(inspections, Type.Recovered);
  let newInspections: Inspections = [...rest, ...recovered];

  const thisAverage = getAverage(inspections, [period]);
  const periodAverage = Math.floor(thisAverage);
  const decimals = thisAverage - periodAverage;
  let decimalsAccumulator = 0;
  let first = true;
  let previous: Inspection;

  newInspections.forEach((inspection) => {
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
    current = {
      index: inspection.index,
      type: inspection.type,
      period: inspection.period,
      start: period.start,
      stop: Math.floor(period.start + currentDuration + sum),
    };
    report.push(current);
    previous = { ...current };
    period.start = period.start + currentDuration + sum;
  });
  return orderByIndex(report);
}

export function makeReport(
  inspections: Inspections,
  periods: Periods
): Inspections {
  let report = [];
  const periodsCount = periods.length;
  let period = { ...periods[0] };
  let first = true;
  let previous: Inspection;

  if (inspections.length > 0) {
    let average = getAverage(inspections, periods);
    inspections.forEach((inspection) => {
      let currentSpan = inspection.type == Type.Closed ? TIME.CLOSED : average;
      let current: Inspection;
      if (first) {
        current = {
          index: report.length,
          type: inspection.type,
          period: period.index,
          start: period.start,
          stop: Math.floor(period.start + currentSpan),
        };
        first = false;
      } else {
        if (previous.stop == period.stop || previous.stop + (currentSpan / 2) > period.stop) {
          period = { ...periods[period.index + 1] };
          current = {
            index: report.length,
            type: inspection.type,
            period: period.index,
            start: period.start,
            stop: Math.floor(period.start + currentSpan),
          };
        } else {
          current = {
            index: report.length,
            type: inspection.type,
            period: period.index,
            start: previous.stop,
            stop: Math.floor(previous.stop + currentSpan),
          };
        }
      }
      report.push(current);
      previous = { ...current };
      period.start = previous.stop;
    });
  }
  return report;
}
