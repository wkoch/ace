import {
  contains,
  getTimeSpan,
  isTimeBetween,
  stringToTime,
  timeToString,
} from "../../src/lib/Time";
import { describe, it, expect } from "@playwright/test";
import { Type } from "../../src/lib/Types";
import type { Interval } from "../../src/lib/Types";

describe("contains()", () => {
  let interval: Interval = { type: Type.Rain, start: 9, stop: 12 };

  it("Intervalo está contido.", () => {
    expect(
      contains(interval, { type: Type.Rain, start: 9, stop: 10 })
    ).toBeTruthy();
  });

  it("Intervalo igual.", () => {
    expect(contains(interval, interval)).toBeTruthy();
  });

  it("Intervalo antes.", () => {
    expect(
      contains(interval, { type: Type.Rain, start: 7, stop: 8 })
    ).toBeFalsy();
  });

  it("Intervalo depois.", () => {
    expect(
      contains(interval, { type: Type.Rain, start: 13, stop: 14 })
    ).toBeFalsy();
  });

  it("Intervalo intercede.", () => {
    expect(
      contains(interval, { type: Type.Rain, start: 8, stop: 10 })
    ).toBeFalsy();
  });

  it("Intervalo extrapola.", () => {
    expect(
      contains(interval, { type: Type.Rain, start: 11, stop: 13 })
    ).toBeFalsy();
  });
});

describe("getTimeSpan()", () => {
  it("Empty list returns 0.", () => {
    expect(getTimeSpan([])).toBe(0);
  });

  it("Returns the time Span of one item.", () => {
    expect(getTimeSpan([{ start: 0, stop: 10 }])).toBe(10);
  });

  it("Returns the time Span of multiple itens.", () => {
    expect(
      getTimeSpan([
        { start: 0, stop: 10 },
        { start: 15, stop: 25 },
        { start: 500, stop: 510 },
        { start: 1234567, stop: 1234577 },
      ])
    ).toBe(40);
  });
});

describe("isTimeBetween()", () => {
  it("900 is between 500 and 1000, inclusive.", () => {
    expect(isTimeBetween(900, 500, 1000)).toBeTruthy();
  });

  it("500 is between 500 and 1000, inclusive.", () => {
    expect(isTimeBetween(500, 500, 1000)).toBeTruthy();
  });

  it("1000 is between 500 and 1000, inclusive.", () => {
    expect(isTimeBetween(1000, 500, 1000)).toBeTruthy();
  });

  it("400 is not between 500 and 1000, inclusive.", () => {
    expect(isTimeBetween(400, 500, 1000)).toBeFalsy();
  });

  it("1200 is not between 500 and 1000, inclusive.", () => {
    expect(isTimeBetween(1200, 500, 1000)).toBeFalsy();
  });
});

describe("stringToTime()", () => {
  it('Converts "00:00" to 0.', () => {
    expect(stringToTime("00:00")).toEqual(0);
  });

  it('Converts "08:40" to 31200000.', () => {
    expect(stringToTime("08:40")).toEqual(31200000);
  });

  it('Converts "23:59" to 86340000.', () => {
    expect(stringToTime("23:59")).toEqual(86340000);
  });
});

describe("timeToString()", () => {
  it('Converts 0 to "00:00".', () => {
    expect(timeToString(0)).toEqual("00:00");
  });

  it('Converts 31200000 to "08:40".', () => {
    expect(timeToString(31200000)).toEqual("08:40");
  });

  it('Converts 86340000 to "23:59".', () => {
    expect(timeToString(86340000)).toEqual("23:59");
  });
});
