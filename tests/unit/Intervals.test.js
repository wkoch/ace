import { TEXT } from "../../src/data/Data";
import { getLunchInterval } from "../../src/lib/Intervals";
import { periods } from "./../testData.js";

describe("getLunchInterval()", () => {
    test('Both periods are active.', () => {
        expect(getLunchInterval(periods.morningOn, periods.afternoonOn)).toEqual({ type: TEXT.LUNCH, start: periods.morningOn.end, end: periods.afternoonOn.start });
    });

    test('Only morning active.', () => {
        expect(getLunchInterval(periods.morningOn, periods.afternoonOff)).toEqual({ type: TEXT.LUNCH, start: 0, end: 0 });
    });

    test('Only afternoon active.', () => {
        expect(getLunchInterval(periods.morningOff, periods.afternoonOn)).toEqual({ type: TEXT.LUNCH, start: 0, end: 0 });
    });
});