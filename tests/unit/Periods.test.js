import { getInitialPeriod } from "../../src/lib/Periods";
import { periods } from "./../testData.js";
import { TEXT } from "../../src/data/Data";


describe("getInitialPeriod()", () => {
    test('Both periods are active.', () => {
        let result = { ...periods.morningOn };
        result.end = periods.afternoonOn.end;
        result.endTime = periods.afternoonOn.endTime;
        result.span = periods.morningOn.span + periods.afternoonOn.span;
        result.nextInterval = TEXT.LUNCH;
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