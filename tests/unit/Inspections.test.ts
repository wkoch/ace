import { describe, it, expect } from '@playwright/test';

import { TEXT } from "../../src/data/Data";
import { finalReport, makeReport } from "../../src/lib/Inspections";
import { inspections, periods } from "../testData";
import { timeToString } from "../../src/lib/Time";


// describe("finalReport()", () => {
//     it('Empty list.', () => {
//         expect(finalReport(inspections.emptyDay.list, [periods.morningOn])).toEqual([]);
//     });

//     it('Two inspections, one period.', () => {
//         expect(finalReport([{ index: 1, type: TEXT.NORMAL, period: TEXT.MORNING }, { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING }], [periods.morningOn])).toEqual([{ average: 4800000, index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 36000000, sum: 0 }, { average: 4800000, index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36000000, end: 40800000, sum: 0 }]);
//     });

//     it('Four inspections, one period.', () => {
//         let inspections = [
//             { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 3, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING }
//         ];
//         let result = [
//             { average: 2400000, index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 33600000, sum: 0 },
//             { average: 2400000, index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 33600000, end: 36000000, sum: 0 },
//             { average: 2400000, index: 3, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36000000, end: 38400000, sum: 0 },
//             { average: 2400000, index: 4, type: TEXT.NORMAL, period: TEXT.MORNING, start: 38400000, end: 40800000, sum: 0 }
//         ];
//         expect(finalReport(inspections, [periods.morningOn])).toEqual(result);
//     });

//     it('Eight inspections, two periods.', () => {
//         let inspections = [
//             { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 3, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 5, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//         ];
//         let result = [
//             // Morning
//             { average: 2400000, index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 33600000, sum: 0 },
//             { average: 2400000, index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 33600000, end: 36000000, sum: 0 },
//             // Morning rain interval
//             { average: 2400000, index: 3, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36000000, end: 38400000, sum: 0 },
//             { average: 2400000, index: 4, type: TEXT.NORMAL, period: TEXT.MORNING, start: 38400000, end: 40800000, sum: 0 },
//             // Lunch interval
//             { average: 2700000, index: 5, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51600000, end: 54300000, sum: 0 },
//             { average: 2700000, index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 54300000, end: 57000000, sum: 0 },
//             // Afternoon rain interval
//             { average: 2700000, index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 57000000, end: 59700000, sum: 0 },
//             { average: 2700000, index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 59700000, end: 62400000, sum: 0 }
//         ];
//         expect(finalReport(inspections, [periods.morningOn, periods.afternoonOn])).toEqual(result);
//     });

//     it('Eight inspections, four periods.', () => {
//         let periods = [
//             {
//                 active: true,
//                 name: TEXT.MORNING,
//                 startTime: "08:40",
//                 endTime: "09:45",
//                 start: 31200000,
//                 end: 35100000,
//                 span: 3900000,
//                 nextInterval: 0
//             },
//             {
//                 active: true,
//                 name: TEXT.MORNING,
//                 startTime: "10:15",
//                 endTime: "11:20",
//                 start: 36900000,
//                 end: 40800000,
//                 span: 3900000,
//                 nextInterval: 1
//             },
//             {
//                 active: true,
//                 name: TEXT.AFTERNOON,
//                 startTime: "14:20",
//                 endTime: "15:30",
//                 start: 51600000,
//                 end: 55800000,
//                 span: 4200000,
//                 nextInterval: 2
//             },
//             {
//                 active: true,
//                 name: TEXT.AFTERNOON,
//                 startTime: "16:10",
//                 endTime: "17:20",
//                 start: 58200000,
//                 end: 62400000,
//                 span: 4200000,
//                 nextInterval: null
//             },
//         ];
//         let inspections = [
//             { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 3, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING },
//             { index: 5, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//             { index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
//         ];
//         let result = [
//             { average: 1950000, index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 33150000, sum: 0 },
//             { average: 1950000, index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 33150000, end: 35100000, sum: 0 },
//             { average: 1950000, index: 3, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36900000, end: 38850000, sum: 0 },
//             { average: 1950000, index: 4, type: TEXT.NORMAL, period: TEXT.MORNING, start: 38850000, end: 40800000, sum: 0 },

//             { average: 2100000, index: 5, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51600000, end: 53700000, sum: 0 },
//             { average: 2100000, index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 53700000, end: 55800000, sum: 0 },
//             { average: 2100000, index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 58200000, end: 60300000, sum: 0 },
//             { average: 2100000, index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 60300000, end: 62400000, sum: 0 }
//         ];
//         expect(finalReport(inspections, periods)).toEqual(result);
//     });
// });


describe("makeReport()", () => {
    it('Empty list.', () => {
        expect(makeReport(inspections.emptyDay.list, { ...periods.morningOn, ...periods.afternoonOn })).toEqual([]);
    });

    it('Morning only active, two inspections.', () => {
        let inspections = [
            { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
            { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING }
        ];
        let result = [
            { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 36000000 },
            { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36000000, end: 40800000 }
        ];
        expect(makeReport(inspections, [periods.morningOn])).toEqual(result);
    });

    it('Afternoon only active, two inspections.', () => {
        let inspections = [
            { index: 1, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
            { index: 2, type: TEXT.NORMAL, period: TEXT.AFTERNOON }
        ];
        let result = [
            { index: 1, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51600000, end: 57000000 },
            { index: 2, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 57000000, end: 62400000 }
        ];
        expect(makeReport(inspections, [periods.afternoonOn])).toEqual(result);
    });

    it('Both periods active, two inspections in each.', () => {
        let inspections = [
            { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
            { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
            { index: 3, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
            { index: 4, type: TEXT.NORMAL, period: TEXT.AFTERNOON }
        ];
        // Média geral calculada sem o intervalo do almoço.
        let result = [
            { index: 1, period: TEXT.MORNING, type: TEXT.NORMAL, start: 31200000, end: 36300000 },
            { index: 2, period: TEXT.MORNING, type: TEXT.NORMAL, start: 36300000, end: 41400000 },
            { index: 3, period: TEXT.AFTERNOON, type: TEXT.NORMAL, start: 51600000, end: 56700000 },
            { index: 4, period: TEXT.AFTERNOON, type: TEXT.NORMAL, start: 56700000, end: 61800000 }
        ];
        expect(makeReport(inspections, [periods.morningOn, periods.afternoonOn])).toEqual(result);
    });

    // it('Both periods are active.', () => {
    //     let periods = [
    //         {
    //             active: true,
    //             name: TEXT.MORNING,
    //             startTime: "08:40",
    //             endTime: "09:45",
    //             start: 31200000,
    //             end: 35100000,
    //             span: 3900000,
    //             nextInterval: 0
    //         },
    //         {
    //             active: true,
    //             name: TEXT.MORNING,
    //             startTime: "10:15",
    //             endTime: "11:20",
    //             start: 36900000,
    //             end: 40800000,
    //             span: 3900000,
    //             nextInterval: 1
    //         },
    //         {
    //             active: true,
    //             name: TEXT.AFTERNOON,
    //             startTime: "14:20",
    //             endTime: "15:30",
    //             start: 51600000,
    //             end: 55800000,
    //             span: 4200000,
    //             nextInterval: 2
    //         },
    //         {
    //             active: true,
    //             name: TEXT.AFTERNOON,
    //             startTime: "16:10",
    //             endTime: "17:20",
    //             start: 58200000,
    //             end: 62400000,
    //             span: 4200000,
    //             nextInterval: null
    //         },
    //     ];
    //     let inspections = [
    //         { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 3, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 5, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 9, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 10, type: TEXT.NORMAL, period: TEXT.AFTERNOON }
    //     ];
    //     let result = [
    //         { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31200000, end: 33000000 },
    //         { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 33000000, end: 34800000 },
    //         { index: 3, type: TEXT.NORMAL, period: TEXT.MORNING, start: 34800000, end: 36600000 },
    //         { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING, start: 36600000, end: 38400000 },
    //         { index: 5, type: TEXT.NORMAL, period: TEXT.MORNING, start: 38400000, end: 40200000 },

    //         { index: 6, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51600000, end: 0 },
    //         { index: 7, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 0, end: 0 },
    //         { index: 8, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 0, end: 0 },
    //         { index: 9, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 0, end: 62400000 }
    //     ];
    //     expect(makeReport(inspections, periods)).toEqual(result);
    // });

    // it('Both periods active in four parts.', () => {
    //     let periods = [
    //         {
    //             active: true,
    //             name: TEXT.MORNING,
    //             startTime: "08:00",
    //             endTime: "09:00",
    //             start: 28800000,
    //             end: 32400000,
    //             span: 3600000,
    //             nextInterval: 0
    //         },
    //         {
    //             active: true,
    //             name: TEXT.MORNING,
    //             startTime: "11:00",
    //             endTime: "11:20",
    //             start: 39600000,
    //             end: 40800000,
    //             span: 1200000,
    //             nextInterval: 1
    //         },
    //         {
    //             active: true,
    //             name: TEXT.AFTERNOON,
    //             startTime: "14:00",
    //             endTime: "14:58",
    //             start: 50400000,
    //             end: 53880000,
    //             span: 3480000,
    //             nextInterval: 2
    //         },
    //         {
    //             active: true,
    //             name: TEXT.AFTERNOON,
    //             startTime: "16:50",
    //             endTime: "17:20",
    //             start: 60600000,
    //             end: 62400000,
    //             span: 1800000,
    //             nextInterval: null
    //         },
    //     ];
    //     let inspections = [
    //         // Manhã
    //         // Serão do primeiro período
    //         { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 3, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 5, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 6, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 7, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 8, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 9, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 10, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         // Serão do segundo período
    //         { index: 11, type: TEXT.CLOSED, period: TEXT.MORNING },
    //         { index: 12, type: TEXT.NORMAL, period: TEXT.MORNING },
    //         { index: 13, type: TEXT.NORMAL, period: TEXT.MORNING },

    //         // Tarde
    //         // Serão do terceiro período
    //         { index: 14, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 15, type: TEXT.CLOSED, period: TEXT.AFTERNOON },
    //         { index: 16, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 17, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 18, type: TEXT.CLOSED, period: TEXT.AFTERNOON },
    //         { index: 19, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 20, type: TEXT.CLOSED, period: TEXT.AFTERNOON },
    //         { index: 21, type: TEXT.CLOSED, period: TEXT.AFTERNOON },
    //         { index: 22, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         // Serão do quarto período
    //         { index: 23, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 24, type: TEXT.CLOSED, period: TEXT.AFTERNOON },
    //         { index: 25, type: TEXT.NORMAL, period: TEXT.AFTERNOON },
    //         { index: 26, type: TEXT.NORMAL, period: TEXT.AFTERNOON }
    //     ];
    //     let result = [
    //         // Manhã
    //         // Serão do primeiro período
    //         { index: 1, type: TEXT.NORMAL, period: TEXT.MORNING, start: 28800000, end: 29340000 },
    //         { index: 2, type: TEXT.NORMAL, period: TEXT.MORNING, start: 29340000, end: 29880000 },
    //         { index: 3, type: TEXT.CLOSED, period: TEXT.MORNING, start: 29880000, end: 30060000 },
    //         { index: 4, type: TEXT.NORMAL, period: TEXT.MORNING, start: 30060000, end: 30600000 },
    //         { index: 5, type: TEXT.CLOSED, period: TEXT.MORNING, start: 30600000, end: 30780000 },
    //         { index: 6, type: TEXT.NORMAL, period: TEXT.MORNING, start: 30780000, end: 31320000 },
    //         { index: 7, type: TEXT.CLOSED, period: TEXT.MORNING, start: 31320000, end: 31500000 },
    //         { index: 8, type: TEXT.CLOSED, period: TEXT.MORNING, start: 31500000, end: 31680000 },
    //         { index: 9, type: TEXT.CLOSED, period: TEXT.MORNING, start: 31680000, end: 31860000 },
    //         { index: 10, type: TEXT.NORMAL, period: TEXT.MORNING, start: 31860000, end: 32400000 },
    //         // Serão do segundo período
    //         { index: 11, type: TEXT.CLOSED, period: TEXT.MORNING, start: 39600000, end: 39780000 },
    //         { index: 12, type: TEXT.NORMAL, period: TEXT.MORNING, start: 39780000, end: 40320000 },
    //         { index: 13, type: TEXT.NORMAL, period: TEXT.MORNING, start: 40320000, end: 40860000 },

    //         // Tarde
    //         // Serão do terceiro período
    //         { index: 14, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 50400000, end: 50940000 },
    //         { index: 15, type: TEXT.CLOSED, period: TEXT.AFTERNOON, start: 50940000, end: 51120000 },
    //         { index: 16, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51120000, end: 51660000 },
    //         { index: 17, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 51660000, end: 52200000 },
    //         { index: 18, type: TEXT.CLOSED, period: TEXT.AFTERNOON, start: 52200000, end: 52380000 },
    //         { index: 19, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 52380000, end: 52920000 },
    //         { index: 20, type: TEXT.CLOSED, period: TEXT.AFTERNOON, start: 52920000, end: 53100000 },
    //         { index: 21, type: TEXT.CLOSED, period: TEXT.AFTERNOON, start: 53100000, end: 53280000 },
    //         { index: 22, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 53280000, end: 53820000 },
    //         // Serão do quarto período
    //         { index: 23, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 60600000, end: 61140000 },
    //         { index: 24, type: TEXT.CLOSED, period: TEXT.AFTERNOON, start: 61140000, end: 61320000 },
    //         { index: 25, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 61320000, end: 61860000 },
    //         { index: 26, type: TEXT.NORMAL, period: TEXT.AFTERNOON, start: 61860000, end: 62400000 }
    //     ];
    //     // console.table(periods);
    //     // console.table(result);
    //     console.table(makeReport(inspections, periods));
    //     expect(makeReport(inspections, periods)).toEqual(result);
    // });

    // it('Only morning active.', () => {
    //     expect(makeReport(inspections.normalDay.list, { ...periods.morningOn, ...periods.afternoonOff }, 840000)).toEqual([{}]);
    // });

    // it('Only afternoon active.', () => {
    //     expect(makeReport(inspections.normalDay.list, { ...periods.morningOff, ...periods.afternoonOn }, 840000)).toEqual([{}]);
    // });
});