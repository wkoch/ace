import { makeReport } from "../../src/lib/Inspections";
import { inspections, periods } from "./../testData.js";

describe("makeReport()", () => {
    test('Empty list.', () => {
        expect(makeReport(inspections.emptyDay.list, { ...periods.morningOn, ...periods.afternoonOn }, 0)).toEqual([]);
    });

    // test('Both periods are active.', () => {
    //     expect(makeReport(inspections.normalDay.list, { ...periods.morningOn, ...periods.afternoonOn }, 840000)).toEqual([{}]);
    // });

    // test('Only morning active.', () => {
    //     expect(makeReport(inspections.normalDay.list, { ...periods.morningOn, ...periods.afternoonOff }, 840000)).toEqual([{}]);
    // });

    // test('Only afternoon active.', () => {
    //     expect(makeReport(inspections.normalDay.list, { ...periods.morningOff, ...periods.afternoonOn }, 840000)).toEqual([{}]);
    // });
});