import { getInitialPeriod, subtractIntervalsFromDay } from "../../src/lib/Periods";
import { periods } from "./../testData.js";
import { TEXT } from "../../src/data/Data";


describe("getInitialPeriod()", () => {
    test('Both periods are active.', () => {
        let result = { ...periods.morningOn };
        result.end = periods.afternoonOn.end;
        result.endTime = periods.afternoonOn.endTime;
        result.span = periods.morningOn.span + periods.afternoonOn.span;
        result.nextInterval = 0;
        expect(getInitialPeriod(periods.morningOn, periods.afternoonOn)).toEqual(result);
    });

    test('Only morning active.', () => {
        let result = { ...periods.morningOn };
        expect(getInitialPeriod(periods.morningOn, periods.afternoonOff)).toEqual(result);
    });

    test('Only afternoon active.', () => {
        let result = { ...periods.afternoonOn };
        expect(getInitialPeriod(periods.morningOff, periods.afternoonOn)).toEqual(result);
    });
});


describe("subtractIntervalsFromDay()", () => {

    // Basic periods
    test('Both periods are active, subtract Lunch.', () => {
        let day = { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "17:20", start: 31200000, end: 62400000, span: 31200000, nextInterval: null };
        let lunchInterval = [{ type: TEXT.LUNCH, start: 40800000, end: 51600000 }];
        let morning = { ...periods.morningOn };
        morning.nextInterval = 0;
        let result = [morning, periods.afternoonOn];
        expect(subtractIntervalsFromDay(day, lunchInterval)).toEqual(result);
    });

    test('Only morning active, subtract lunch.', () => {
        let result = [periods.morningOn];
        expect(subtractIntervalsFromDay(periods.morningOn, [])).toEqual(result);
    });

    test('Only afternoon active.', () => {
        let result = [periods.afternoonOn];
        expect(subtractIntervalsFromDay(periods.afternoonOn, [])).toEqual(result);
    });

    // Periods with rain
    test('Both periods are active, subtract Lunch and rain.', () => {
        let day = { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "17:20", start: 31200000, end: 62400000, span: 31200000, nextInterval: null };
        let intervals = [{ type: TEXT.RAIN, start: 32400000, end: 36000000 }, { type: TEXT.LUNCH, start: 40800000, end: 51600000 }];
        let morning = [{ name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "09:00", start: 31200000, end: 32400000, span: 1200000, nextInterval: 0 }, { name: TEXT.MORNING, active: true, startTime: "10:00", endTime: "11:20", start: 36000000, end: 40800000, span: 4800000, nextInterval: 1 }];
        let result = [...morning, periods.afternoonOn];
        expect(subtractIntervalsFromDay(day, intervals)).toEqual(result);
    });

    test('Both periods are active, subtract Lunch and multiple rains.', () => {
        let day = { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "17:20", start: 31200000, end: 62400000, span: 31200000, nextInterval: null };
        let intervals = [
            { type: TEXT.RAIN, start: 32400000, end: 36000000 },
            { type: TEXT.RAIN, start: 37800000, end: 39600000 },
            { type: TEXT.LUNCH, start: 40800000, end: 51600000 },
            { type: TEXT.RAIN, start: 54000000, end: 57600000 },
        ];
        let result = [
            { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "09:00", start: 31200000, end: 32400000, span: 1200000, nextInterval: 0 },
            { name: TEXT.MORNING, active: true, startTime: "10:00", endTime: "10:30", start: 36000000, end: 37800000, span: 1800000, nextInterval: 1 },
            { name: TEXT.MORNING, active: true, startTime: "11:00", endTime: "11:20", start: 39600000, end: 40800000, span: 1200000, nextInterval: 2 },
            { name: TEXT.AFTERNOON, active: true, startTime: "14:20", endTime: "15:00", start: 51600000, end: 54000000, span: 2400000, nextInterval: 3 },
            { name: TEXT.AFTERNOON, active: true, startTime: "16:00", endTime: "17:20", start: 57600000, end: 62400000, span: 4800000, nextInterval: null },
        ];
        expect(subtractIntervalsFromDay(day, intervals)).toEqual(result);
    });

    test('Morning only, subtract multiple rains.', () => {
        let day = { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "11:20", start: 31200000, end: 40800000, span: 9600000, nextInterval: null };
        let intervals = [
            { type: TEXT.RAIN, start: 32400000, end: 36000000 },
            { type: TEXT.RAIN, start: 37800000, end: 39600000 }
        ];
        let result = [
            { name: TEXT.MORNING, active: true, startTime: "08:40", endTime: "09:00", start: 31200000, end: 32400000, span: 1200000, nextInterval: 0 },
            { name: TEXT.MORNING, active: true, startTime: "10:00", endTime: "10:30", start: 36000000, end: 37800000, span: 1800000, nextInterval: 1 },
            { name: TEXT.MORNING, active: true, startTime: "11:00", endTime: "11:20", start: 39600000, end: 40800000, span: 1200000, nextInterval: null },
        ];
        expect(subtractIntervalsFromDay(day, intervals)).toEqual(result);
    });
});