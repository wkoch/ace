import { isTimeBetween, timeToString, stringToTime } from "./Time"


describe("isTimeBetween()", () => {
    test('Is 900 between 500 and a 1000?', () => {
        expect(isTimeBetween(900, 500, 1000)).toBe(true);
    });

    test('Is 500 between 500 and a 1000?', () => {
        expect(isTimeBetween(500, 500, 1000)).toBe(true);
    });

    test('Is 1000 between 500 and a 1000?', () => {
        expect(isTimeBetween(1000, 500, 1000)).toBe(true);
    });

    test('Is 400 between 500 and a 1000?', () => {
        expect(isTimeBetween(400, 500, 1000)).toBe(false);
    });

    test('Is 1200 between 500 and a 1000?', () => {
        expect(isTimeBetween(1200, 500, 1000)).toBe(false);
    });
});


describe("msToText()", () => {
    test('Converts 0 to 00:00.', () => {
        expect(timeToString(0)).toEqual("00:00");
    });

    test('Converts 31200000 to 08:40.', () => {
        expect(timeToString(31200000)).toEqual("08:40");
    });

    test('Converts 86340000 to 23:59.', () => {
        expect(timeToString(86340000)).toEqual("23:59");
    });
});


describe("textToMS()", () => {
    test('Converts 00:00 to 0.', () => {
        expect(stringToTime("00:00")).toEqual(0);
    });

    test('Converts 08:40 to 31200000.', () => {
        expect(stringToTime("08:40")).toEqual(31200000);
    });

    test('Converts 23:59 to 86340000.', () => {
        expect(stringToTime("23:59")).toEqual(86340000);
    });
});