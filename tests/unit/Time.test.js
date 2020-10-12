import { TEXT } from "../../src/data/Data";
import { contains, isTimeBetween, stringToTime, timeToString } from "../../src/lib/Time"
import { intervals } from "../testData";


describe("contains()", () => {
    let interval = { type: TEXT.RAIN, start: 9, end: 12 };

    test('Intervalo está contido.', () => {
        expect(contains(interval, { type: TEXT.RAIN, start: 9, end: 10 })).toBeTruthy();
    });

    test('Intervalo igual.', () => {
        expect(contains(interval, interval)).toBeTruthy();
    });

    test('Intervalo antes.', () => {
        expect(contains(interval, { type: TEXT.RAIN, start: 7, end: 8 })).toBeFalsy();
    });

    test('Intervalo depois.', () => {
        expect(contains(interval, { type: TEXT.RAIN, start: 13, end: 14 })).toBeFalsy();
    });

    test('Intervalo intercede.', () => {
        expect(contains(interval, { type: TEXT.RAIN, start: 8, end: 10 })).toBeFalsy();
    });

    test('Intervalo extrapola.', () => {
        expect(contains(interval, { type: TEXT.RAIN, start: 11, end: 13 })).toBeFalsy();
    });
});


describe("isTimeBetween()", () => {
    test('900 is between 500 and 1000, inclusive.', () => {
        expect(isTimeBetween(900, 500, 1000)).toBeTruthy();
    });

    test('500 is between 500 and 1000, inclusive.', () => {
        expect(isTimeBetween(500, 500, 1000)).toBeTruthy();
    });

    test('1000 is between 500 and 1000, inclusive.', () => {
        expect(isTimeBetween(1000, 500, 1000)).toBeTruthy();
    });

    test('400 is not between 500 and 1000, inclusive.', () => {
        expect(isTimeBetween(400, 500, 1000)).toBeFalsy();
    });

    test('1200 is not between 500 and 1000, inclusive.', () => {
        expect(isTimeBetween(1200, 500, 1000)).toBeFalsy();
    });
});


describe("stringToTime()", () => {
    test('Converts "00:00" to 0.', () => {
        expect(stringToTime("00:00")).toEqual(0);
    });

    test('Converts "08:40" to 31200000.', () => {
        expect(stringToTime("08:40")).toEqual(31200000);
    });

    test('Converts "23:59" to 86340000.', () => {
        expect(stringToTime("23:59")).toEqual(86340000);
    });
});


describe("timeToString()", () => {
    test('Converts 0 to "00:00".', () => {
        expect(timeToString(0)).toEqual("00:00");
    });

    test('Converts 31200000 to "08:40".', () => {
        expect(timeToString(31200000)).toEqual("08:40");
    });

    test('Converts 86340000 to "23:59".', () => {
        expect(timeToString(86340000)).toEqual("23:59");
    });
});