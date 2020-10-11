/**
 * @typedef { import("./Types").Inspections } Inspections
 * @typedef { import("./Types").Periods } Periods
 */
import { inspections } from "../../tests/testData";

/** @type {(inspections: Inspections, periods: Periods, average: number) => Inspections} */
export function makeReport(inspections, periods, average) {
    let report = [];
    let changePeriod = false;
    const periodsCount = periods.length;
    let periodIndex = 0
    let period = { ...periods[periodIndex] };
    let first = true;
    let previous;

    if (inspections.length > 0) {
        inspections.forEach(inspection => {
            let currentSpan = inspection.type == "N" ? average : 180000; // FIXME replace N and 3 by constants
            let current;
            if (first) {
                current = {
                    index: inspection.index,
                    type: inspection.type,
                    period: period.name,
                    start: period.start,
                    end: Math.floor(period.start + currentSpan)
                };
                first = false;
            } else if (changePeriod) {
                periodIndex += 1;
                period = { ...periods[periodIndex] };
                current = {
                    index: inspection.index,
                    type: inspection.type,
                    period: period.name,
                    start: period.start,
                    end: Math.floor(period.start + currentSpan)
                };
                changePeriod = false;
            } else {
                if (periodIndex + 1 < periodsCount && previous.end < period.end && previous.end + currentSpan > period.end) {
                    changePeriod = true;
                }
                current = {
                    index: inspection.index,
                    type: inspection.type,
                    period: period.name,
                    start: previous.end,
                    end: Math.floor(previous.end + currentSpan)
                };
            }
            report.push(current);
            previous = { ...current };
            period.start = previous.end;
        });
    }
    return report;
}


export function improvePrecision(simpleReport, ogPeriod) {
    let report = [];
    let period = { ...ogPeriod };
    const inspections = simpleReport.filter(el => el.period == period.name);
    const Ns = inspections.filter(el => el.type == "N").length;
    const Fs = inspections.filter(el => el.type == "F").length;
    const thisAverage = (period.span - 180000 * Fs) / Ns;
    const periodAverage = Math.floor(thisAverage);
    const decimals = thisAverage - periodAverage;
    let decimalsAccumulator = 0;
    let first = true;
    let previous;

    inspections.forEach(inspection => {
        decimalsAccumulator += decimals;
        let sum = 0;
        if (decimalsAccumulator > 1) {
            sum = 1;
            decimalsAccumulator -= 1;
        } else {
            sum = 0;
        }
        const currentDuration = inspection.type == "N" ? periodAverage : 180000;
        let current;
        if (first) {
            current = {
                index: inspection.index,
                type: inspection.type,
                period: inspection.period,
                start: period.start,
                end: Math.floor(period.start + currentDuration + sum),
                average: currentDuration,
                sum: sum
            };
            first = false;
        } else {
            current = {
                index: inspection.index,
                type: inspection.type,
                period: inspection.period,
                start: period.start,
                end: Math.floor(period.start + currentDuration + sum),
                average: currentDuration,
                sum: sum
            };
        }
        report.push(current);
        previous = { ...current };
        period.start = previous.end;
    });
    return report;
}


export function finalReport(simpleReport, periods) {
    let finishedReport = [];

    periods.forEach(period => {
        finishedReport = [...finishedReport, ...improvePrecision(simpleReport, period)];
    });

    return finishedReport;
}