import {
    compareByStartTime,
    countByType,
    filter,
    orderByStartTime
} from "../../src/lib/Helpers";
import { TEXT } from "../../src/data/Data";
import { inspections, periods } from "./../testData.js";


describe("compareByStartTime()", () => {
    test('First is bigger.', () => {
        expect(compareByStartTime(periods.afternoonOn, periods.morningOn)).toBe(1);
    });

    test('First is smaller.', () => {
        expect(compareByStartTime(periods.morningOn, periods.afternoonOn)).toBe(-1);
    });

    test('Both are equal.', () => {
        expect(compareByStartTime(periods.morningOn, periods.morningOn)).toBe(0);
    });
});


describe("countByType()", () => {
    test('Inspections list is Empty.', () => {
        expect(countByType(inspections.emptyDay.list, TEXT.NORMAL)).toBe(0);
    });

    test('No inspections of the Type found.', () => {
        expect(countByType(inspections.normalDay.list, TEXT.RECOVERED)).toBe(0);
    });

    test('Count the Normal type.', () => {
        expect(countByType(inspections.normalDay.list, TEXT.NORMAL)).toBe(inspections.normalDay.normal);
    });

    test(`Count the ${TEXT.CLOSED} type.`, () => {
        expect(countByType(inspections.normalDay.list, TEXT.CLOSED)).toBe(inspections.normalDay.closed);
    });

    test(`Count the ${TEXT.RECOVERED} type.`, () => {
        expect(countByType(inspections.normalDayRecovered.list, TEXT.RECOVERED)).toBe(inspections.normalDayRecovered.recovered);
    });
});


describe("filter()", () => {
    test('Inspections list is Empty.', () => {
        expect(filter(inspections.emptyDay.list, TEXT.NORMAL).length).toBe(0);
    });

    test('Inspections list is Empty.', () => {
        expect(filter(inspections.emptyDay.list, TEXT.NORMAL)).toEqual([]);
    });

    test('No inspections of the Type found.', () => {
        expect(filter(inspections.normalDay.list, TEXT.RECOVERED).length).toBe(0);
    });

    test('No inspections found.', () => {
        expect(filter(inspections.normalDay.list, TEXT.RECOVERED)).toEqual([]);
    });

    test('Filter the Normal type.', () => {
        expect(filter(inspections.normalDay.list, TEXT.NORMAL).length).toBe(inspections.normalDay.normal);
    });

    test(`Filter the ${TEXT.CLOSED} type.`, () => {
        expect(filter(inspections.normalDay.list, TEXT.CLOSED).length).toBe(inspections.normalDay.closed);
    });

    test(`Filter the ${TEXT.RECOVERED} type.`, () => {
        expect(filter(inspections.normalDayRecovered.list, TEXT.RECOVERED).length).toBe(inspections.normalDayRecovered.recovered);
    });

    test(`Filter the ${TEXT.RECOVERED} type.`, () => {
        expect(filter(inspections.normalDayRecovered.list, TEXT.RECOVERED)).toEqual([{
            index: 3,
            type: TEXT.RECOVERED,
            period: "",
            start: 0,
            end: 0
        }, {
            index: 9,
            type: TEXT.RECOVERED,
            period: "",
            start: 0,
            end: 0
        }]);
    });
});


describe("orderByStartTime()", () => {
    test('Empty list.', () => {
        expect(orderByStartTime([])).toEqual([]);
    });

    test('First is bigger.', () => {
        expect(orderByStartTime([periods.afternoonOn, periods.morningOn])).toEqual([periods.morningOn, periods.afternoonOn]);
    });

    test('First is smaller.', () => {
        expect(orderByStartTime([periods.morningOn, periods.afternoonOn])).toEqual([periods.morningOn, periods.afternoonOn]);
    });

    test('Both are equal.', () => {
        expect(orderByStartTime([periods.morningOn, periods.morningOn])).toEqual([periods.morningOn, periods.morningOn]);
    });

    test('Multiple values.', () => {
        expect(orderByStartTime([{ start: 5 }, { start: 3 }, { start: 9 }, { start: 1 }, { start: 99 }, { start: -4 }])).toEqual([{ start: -4 }, { start: 1 }, { start: 3 }, { start: 5 }, { start: 9 }, { start: 99 }]);
    });
});