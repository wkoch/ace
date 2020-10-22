import { describe, it, expect } from "@playwright/test";
import { preciseReport, makeReport } from "../../src/lib/Inspections";
import { inspections, periods } from "../testData";
import { Type } from "../../src/lib/Types";
import type { Inspections, Periods } from "../../src/lib/Types";

describe("preciseReport()", () => {
  it("Empty list.", () => {
    expect(preciseReport([], [periods.first])).toEqual([]);
  });

  it("Two inspections, one period.", () => {
    expect(
      preciseReport(
        [
          { index: 0, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
        ],
        [periods.first]
      )
    ).toEqual([
      {
        index: 0,
        type: Type.Normal,
        period: 0,
        start: 31200000,
        stop: 36000000,
      },
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 36000000,
        stop: 40800000,
      },
    ]);
  });

  it("Four inspections, one period.", () => {
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 3, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 4, type: Type.Normal, period: 0, start: 0, stop: 0 },
    ];
    let result: Inspections = [
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 31200000,
        stop: 33600000,
      },
      {
        index: 2,
        type: Type.Normal,
        period: 0,
        start: 33600000,
        stop: 36000000,
      },
      {
        index: 3,
        type: Type.Normal,
        period: 0,
        start: 36000000,
        stop: 38400000,
      },
      {
        index: 4,
        type: Type.Normal,
        period: 0,
        start: 38400000,
        stop: 40800000,
      },
    ];
    expect(preciseReport(inspections, [periods.first])).toEqual(result);
  });

  it("Eight inspections, two periods.", () => {
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 3, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 4, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 5, type: Type.Normal, period: 1, start: 0, stop: 0 },
      { index: 6, type: Type.Normal, period: 1, start: 0, stop: 0 },
      { index: 7, type: Type.Normal, period: 1, start: 0, stop: 0 },
      { index: 8, type: Type.Normal, period: 1, start: 0, stop: 0 },
    ];
    let result: Inspections = [
      // Morning
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 31200000,
        stop: 33600000,
      },
      {
        index: 2,
        type: Type.Normal,
        period: 0,
        start: 33600000,
        stop: 36000000,
      },
      // Morning rain interval
      {
        index: 3,
        type: Type.Normal,
        period: 0,
        start: 36000000,
        stop: 38400000,
      },
      {
        index: 4,
        type: Type.Normal,
        period: 0,
        start: 38400000,
        stop: 40800000,
      },
      // Lunch interval
      {
        index: 5,
        type: Type.Normal,
        period: 1,
        start: 51600000,
        stop: 54300000,
      },
      {
        index: 6,
        type: Type.Normal,
        period: 1,
        start: 54300000,
        stop: 57000000,
      },
      // Afternoon rain interval
      {
        index: 7,
        type: Type.Normal,
        period: 1,
        start: 57000000,
        stop: 59700000,
      },
      {
        index: 8,
        type: Type.Normal,
        period: 1,
        start: 59700000,
        stop: 62400000,
      },
    ];
    expect(
      preciseReport(inspections, [periods.first, periods.fullday.second])
    ).toEqual(result);
  });

  it("Eight inspections, four periods.", () => {
    let periods: Periods = [
      {
        index: 0,
        start: 31200000,
        stop: 35100000,
        span: 3900000,
      },
      {
        index: 1,
        start: 36900000,
        stop: 40800000,
        span: 3900000,
      },
      {
        index: 2,
        start: 51600000,
        stop: 55800000,
        span: 4200000,
      },
      {
        index: 3,
        start: 58200000,
        stop: 62400000,
        span: 4200000,
      },
    ];
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 3, type: Type.Normal, period: 1, start: 0, stop: 0 },
      { index: 4, type: Type.Normal, period: 1, start: 0, stop: 0 },
      { index: 5, type: Type.Normal, period: 2, start: 0, stop: 0 },
      { index: 6, type: Type.Normal, period: 2, start: 0, stop: 0 },
      { index: 7, type: Type.Normal, period: 3, start: 0, stop: 0 },
      { index: 8, type: Type.Normal, period: 3, start: 0, stop: 0 },
    ];
    let result: Inspections = [
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 31200000,
        stop: 33150000,
      },
      {
        index: 2,
        type: Type.Normal,
        period: 0,
        start: 33150000,
        stop: 35100000,
      },
      {
        index: 3,
        type: Type.Normal,
        period: 1,
        start: 36900000,
        stop: 38850000,
      },
      {
        index: 4,
        type: Type.Normal,
        period: 1,
        start: 38850000,
        stop: 40800000,
      },

      {
        index: 5,
        type: Type.Normal,
        period: 2,
        start: 51600000,
        stop: 53700000,
      },
      {
        index: 6,
        type: Type.Normal,
        period: 2,
        start: 53700000,
        stop: 55800000,
      },
      {
        index: 7,
        type: Type.Normal,
        period: 3,
        start: 58200000,
        stop: 60300000,
      },
      {
        index: 8,
        type: Type.Normal,
        period: 3,
        start: 60300000,
        stop: 62400000,
      },
    ];
    expect(preciseReport(inspections, periods)).toEqual(result);
  });
});

describe("makeReport()", () => {
  it("Empty list.", () => {
    expect(
      makeReport(inspections.emptyDay.list, [periods.first, periods.second])
    ).toEqual([]);
  });

  it("Morning only active, two inspections.", () => {
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
    ];
    let result: Inspections = [
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 31200000,
        stop: 36000000,
      },
      {
        index: 2,
        type: Type.Normal,
        period: 0,
        start: 36000000,
        stop: 40800000,
      },
    ];
    expect(makeReport(inspections, [periods.first])).toEqual(result);
  });

  it("Afternoon only active, two inspections.", () => {
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
    ];
    let result = [
      {
        index: 1,
        type: Type.Normal,
        period: 0,
        start: 51600000,
        stop: 57000000,
      },
      {
        index: 2,
        type: Type.Normal,
        period: 0,
        start: 57000000,
        stop: 62400000,
      },
    ];
    expect(makeReport(inspections, [periods.second])).toEqual(result);
  });

  it("Both periods active, two inspections in each.", () => {
    let periods: Periods = [
      {
        index: 0,
        start: 0,
        stop: 200,
        span: 200,
      },
      {
        index: 1,
        start: 1000,
        stop: 1200,
        span: 200,
      }
    ];
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 3, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 4, type: Type.Normal, period: 0, start: 0, stop: 0 },
    ];
    // Média geral calculada sem o intervalo do almoço.
    let result: Inspections = [
      {
        index: 1,
        period: 0,
        type: Type.Normal,
        start: 0,
        stop: 100,
      },
      {
        index: 2,
        period: 0,
        type: Type.Normal,
        start: 100,
        stop: 200,
      },
      {
        index: 3,
        period: 1,
        type: Type.Normal,
        start: 1000,
        stop: 1100,
      },
      {
        index: 4,
        period: 1,
        type: Type.Normal,
        start: 1100,
        stop: 1200,
      },
    ];
    expect(makeReport(inspections, periods)).toEqual(result);
  });

  it('Both periods are active, with rain.', () => {
    let periods: Periods = [
      {
        index: 0,
        start: 0,
        stop: 200,
        span: 200,
      },
      {
        index: 1,
        start: 400,
        stop: 600,
        span: 200,
      },
      {
        index: 2,
        start: 1000,
        stop: 1200,
        span: 200,
      },
      {
        index: 3,
        start: 1400,
        stop: 1600,
        span: 200,
      },
    ];
    let inspections: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 3, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 4, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 5, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 6, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 7, type: Type.Normal, period: 0, start: 0, stop: 0 },
      { index: 8, type: Type.Normal, period: 0, start: 0, stop: 0 }
    ];
    let result: Inspections = [
      { index: 1, type: Type.Normal, period: 0, start: 0, stop: 100 },
      { index: 2, type: Type.Normal, period: 0, start: 100, stop: 200 },

      { index: 3, type: Type.Normal, period: 1, start: 400, stop: 500 },
      { index: 4, type: Type.Normal, period: 1, start: 500, stop: 600 },

      { index: 5, type: Type.Normal, period: 2, start: 1000, stop: 1100 },
      { index: 6, type: Type.Normal, period: 2, start: 1100, stop: 1200 },

      { index: 7, type: Type.Normal, period: 3, start: 1400, stop: 1500 },
      { index: 8, type: Type.Normal, period: 3, start: 1500, stop: 1600 }
    ];
    expect(makeReport(inspections, periods)).toEqual(result);
  });

  it('Both periods active in four parts, broken by lunch and one rain for periods.', () => {
      let periods: Periods = [
          {
              index: 0,
              start: 28800000,
              stop: 32400000,
              span: 3600000,
          },
          {
              index: 1,
              start: 39600000,
              stop: 40800000,
              span: 1200000,
          },
          {
              index: 2,
              start: 50400000,
              stop: 53880000,
              span: 3480000,
          },
          {
              index: 3,
              start: 60600000,
              stop: 62400000,
              span: 1800000,
          },
      ];
      let inspections: Inspections = [
          // Manhã
          // Serão do primeiro período
          { index: 1, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 2, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 3, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 4, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 5, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 6, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 7, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 8, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 9, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 10, type: Type.Normal, period: 0, start: 0, stop: 0 },
          // Serão do segundo período
          { index: 11, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 12, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 13, type: Type.Normal, period: 0, start: 0, stop: 0 },

          // Tarde
          // Serão do terceiro período
          { index: 14, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 15, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 16, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 17, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 18, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 19, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 20, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 21, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 22, type: Type.Normal, period: 0, start: 0, stop: 0 },
          // Serão do quarto período
          { index: 23, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 24, type: Type.Closed, period: 0, start: 0, stop: 0 },
          { index: 25, type: Type.Normal, period: 0, start: 0, stop: 0 },
          { index: 26, type: Type.Normal, period: 0, start: 0, stop: 0 }
      ];
      let result = [
          // Manhã
          // Serão do primeiro período
          { index: 1, type: Type.Normal, period: 0, start: 28800000, stop: 29340000 },
          { index: 2, type: Type.Normal, period: 0, start: 29340000, stop: 29880000 },
          { index: 3, type: Type.Closed, period: 0, start: 29880000, stop: 30060000 },
          { index: 4, type: Type.Normal, period: 0, start: 30060000, stop: 30600000 },
          { index: 5, type: Type.Closed, period: 0, start: 30600000, stop: 30780000 },
          { index: 6, type: Type.Normal, period: 0, start: 30780000, stop: 31320000 },
          { index: 7, type: Type.Closed, period: 0, start: 31320000, stop: 31500000 },
          { index: 8, type: Type.Closed, period: 0, start: 31500000, stop: 31680000 },
          { index: 9, type: Type.Closed, period: 0, start: 31680000, stop: 31860000 },
          { index: 10, type: Type.Normal, period: 0, start: 31860000, stop: 32400000 },
          // Serão do segundo período
          { index: 11, type: Type.Closed, period: 1, start: 39600000, stop: 39780000 },
          { index: 12, type: Type.Normal, period: 1, start: 39780000, stop: 40320000 },
          { index: 13, type: Type.Normal, period: 1, start: 40320000, stop: 40860000 },

          // Tarde
          // Serão do terceiro período
          { index: 14, type: Type.Normal, period: 2, start: 50400000, stop: 50940000 },
          { index: 15, type: Type.Closed, period: 2, start: 50940000, stop: 51120000 },
          { index: 16, type: Type.Normal, period: 2, start: 51120000, stop: 51660000 },
          { index: 17, type: Type.Normal, period: 2, start: 51660000, stop: 52200000 },
          { index: 18, type: Type.Closed, period: 2, start: 52200000, stop: 52380000 },
          { index: 19, type: Type.Normal, period: 2, start: 52380000, stop: 52920000 },
          { index: 20, type: Type.Closed, period: 2, start: 52920000, stop: 53100000 },
          { index: 21, type: Type.Closed, period: 2, start: 53100000, stop: 53280000 },
          { index: 22, type: Type.Normal, period: 2, start: 53280000, stop: 53820000 },
          // Serão do quarto período
          { index: 23, type: Type.Normal, period: 3, start: 60600000, stop: 61140000 },
          { index: 24, type: Type.Closed, period: 3, start: 61140000, stop: 61320000 },
          { index: 25, type: Type.Normal, period: 3, start: 61320000, stop: 61860000 },
          { index: 26, type: Type.Normal, period: 3, start: 61860000, stop: 62400000 }
      ];
      expect(makeReport(inspections, periods)).toEqual(result);
  });

  // it('Only morning active.', () => {
  //     expect(makeReport(inspections.normalDay.list, { ...periods.first, ...afternoon.off }, 840000)).toEqual([{}]);
  // });

  // it('Only afternoon active.', () => {
  //     expect(makeReport(inspections.normalDay.list, { ...morning.off, ...periods.fullDay.second }, 840000)).toEqual([{}]);
  // });
});
