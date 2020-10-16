import { describe, it, expect } from "@playwright/test";
import { getDayPeriod, subtractIntervals } from "../../src/lib/Periods";
import { periods, morning, afternoon } from "../testData";
import { stringToTime } from "../../src/lib/Time";
import { Type } from "../../src/lib/Types";
import type { Day, Intervals, Periods } from "../../src/lib/Types";

describe("getDayPeriod()", () => {
  it("Both periods are active.", () => {
    let result: Day = {
      start: stringToTime(morning.on.begin),
      stop: stringToTime(afternoon.on.end),
    };
    expect(getDayPeriod(morning.on, afternoon.on)).toEqual(result);
  });

  it("Only morning active.", () => {
    let result: Day = {
      start: stringToTime(morning.on.begin),
      stop: stringToTime(morning.on.end),
    };
    expect(getDayPeriod(morning.on, afternoon.off)).toEqual(result);
  });

  it("Only afternoon active.", () => {
    let result: Day = {
      start: stringToTime(afternoon.on.begin),
      stop: stringToTime(afternoon.on.end),
    };
    expect(getDayPeriod(morning.off, afternoon.on)).toEqual(result);
  });
});

describe("subtractIntervals()", () => {
  // Basic periods
  it("Both periods are active, subtract Lunch.", () => {
    let day: Day = {
      start: stringToTime(morning.on.begin),
      stop: stringToTime(afternoon.on.end),
    };
    let intervals: Intervals = [
      {
        type: Type.Lunch,
        start: stringToTime(morning.on.end),
        stop: stringToTime(afternoon.on.begin),
      },
    ];
    let result = [periods.first, periods.second];
    result[1].index = 1;
    expect(subtractIntervals(day, intervals)).toEqual(result);
  });

  it("Only morning active.", () => {
    let day: Day = {
      start: stringToTime(morning.on.begin),
      stop: stringToTime(morning.on.end),
    };
    let result: Periods = [
      {
        index: 0,
        start: stringToTime(morning.on.begin),
        stop: stringToTime(morning.on.end),
        span: stringToTime(morning.on.end) - stringToTime(morning.on.begin),
      },
    ];
    expect(subtractIntervals(day, [])).toEqual(result);
  });

  it("Only afternoon active.", () => {
    let day: Day = {
      start: stringToTime(afternoon.on.begin),
      stop: stringToTime(afternoon.on.end),
    };
    let result: Periods = [
      {
        index: 0,
        start: stringToTime(afternoon.on.begin),
        stop: stringToTime(afternoon.on.end),
        span: stringToTime(afternoon.on.end) - stringToTime(afternoon.on.begin),
      },
    ];
    expect(subtractIntervals(day, [])).toEqual(result);
  });

  let wholeDay: Day = {
    start: stringToTime(morning.on.begin),
    stop: stringToTime(afternoon.on.end),
  };

  // Periods with rain
  it("Both periods are active, subtract Lunch and rain.", () => {
    let intervals: Intervals = [
      { type: Type.Rain, start: 32400000, stop: 36000000 },
      { type: Type.Lunch, start: 40800000, stop: 51600000 },
    ];
    let result: Periods = [
      {
        index: 0,
        start: 31200000,
        stop: 32400000,
        span: 1200000,
      },
      {
        index: 1,
        start: 36000000,
        stop: 40800000,
        span: 4800000,
      },
      {
        index: 2,
        start: stringToTime(afternoon.on.begin),
        stop: stringToTime(afternoon.on.end),
        span: stringToTime(afternoon.on.end) - stringToTime(afternoon.on.begin),
      },
    ];
    expect(subtractIntervals(wholeDay, intervals)).toEqual(result);
  });

  it("Both periods are active, subtract Lunch and multiple rains.", () => {
    let intervals: Intervals = [
      { type: Type.Rain, start: 32400000, stop: 36000000 },
      { type: Type.Rain, start: 37800000, stop: 39600000 },
      { type: Type.Lunch, start: 40800000, stop: 51600000 },
      { type: Type.Rain, start: 54000000, stop: 57600000 },
    ];
    let result: Periods = [
      {
        index: 0,
        start: 31200000,
        stop: 32400000,
        span: 1200000,
      },
      {
        index: 1,
        start: 36000000,
        stop: 37800000,
        span: 1800000,
      },
      {
        index: 2,
        start: 39600000,
        stop: 40800000,
        span: 1200000,
      },
      {
        index: 3,
        start: 51600000,
        stop: 54000000,
        span: 2400000,
      },
      {
        index: 4,
        start: 57600000,
        stop: 62400000,
        span: 4800000,
      },
    ];
    expect(subtractIntervals(wholeDay, intervals)).toEqual(result);
  });

  it("Morning only, subtract multiple rains.", () => {
    let day: Day = {
      start: 31200000,
      stop: 40800000,
    };
    let intervals: Intervals = [
      { type: Type.Rain, start: 32400000, stop: 36000000 },
      { type: Type.Rain, start: 37800000, stop: 39600000 },
    ];
    let result: Periods = [
      {
        index: 0,
        start: 31200000,
        stop: 32400000,
        span: 1200000,
      },
      {
        index: 1,
        start: 36000000,
        stop: 37800000,
        span: 1800000,
      },
      {
        index: 2,
        start: 39600000,
        stop: 40800000,
        span: 1200000,
      },
    ];
    expect(subtractIntervals(day, intervals)).toEqual(result);
  });
});
