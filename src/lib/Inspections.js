/**
 * @typedef { import("./Types").Inspections } Inspections
 * @typedef { import("./Types").Periods } Periods
 */
import { TEXT, TIME } from "../data/Data";
import { countByType } from "../lib/Helpers";


/** @type {(inspections: Inspections, periods: Periods) => number} */
export function getAverage(inspections, periods) {
    const N = countByType(inspections, TEXT.NORMAL);
    const F = countByType(inspections, TEXT.CLOSED);
    const R = countByType(inspections, TEXT.RECOVERED);

    let totalSpan = 0;

    periods.forEach(period => {
        totalSpan += period.span
    });

    return (totalSpan - F * TIME.CLOSED) / N + R;
}

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
            let currentSpan = inspection.type == TEXT.CLOSED ? TIME.CLOSED : average;
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

    const thisAverage = getAverage(inspections, [period]);
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
        const currentDuration = inspection.type == TEXT.CLOSED ? TIME.CLOSED : periodAverage;
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