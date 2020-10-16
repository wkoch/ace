import {
  compareByStartTime,
  countByType,
  filter,
  orderByStartTime,
} from "../../src/lib/Helpers";
import { describe, it, expect } from "@playwright/test";
import { inspections, periods } from "../testData";
import { Type } from "../../src/lib/Types";
import type { Time } from "../../src/lib/Types";

describe("compareByStartTime()", () => {
  it("First is bigger.", () => {
    expect(compareByStartTime(periods.second, periods.first)).toBe(1);
  });

  it("First is smaller.", () => {
    expect(compareByStartTime(periods.first, periods.second)).toBe(-1);
  });

  it("Both are equal.", () => {
    expect(compareByStartTime(periods.first, periods.first)).toBe(0);
  });
});

describe("countByType()", () => {
  it("Inspections list is Empty.", () => {
    expect(countByType(inspections.emptyDay.list, Type.Normal)).toBe(0);
  });

  it("No inspections of the Type found.", () => {
    expect(countByType(inspections.normalDay.list, Type.Recovered)).toBe(0);
  });

  it("Count the Normal type.", () => {
    expect(countByType(inspections.normalDay.list, Type.Normal)).toBe(
      inspections.normalDay.normal
    );
  });

  it(`Count the ${Type.Closed} type.`, () => {
    expect(countByType(inspections.normalDay.list, Type.Closed)).toBe(
      inspections.normalDay.closed
    );
  });

  it(`Count the ${Type.Recovered} type.`, () => {
    expect(
      countByType(inspections.normalDayRecovered.list, Type.Recovered)
    ).toBe(inspections.normalDayRecovered.recovered);
  });
});

describe("filter()", () => {
  it("Inspections list is Empty.", () => {
    expect(filter(inspections.emptyDay.list, Type.Normal).length).toBe(0);
  });

  it("Inspections list is Empty.", () => {
    expect(filter(inspections.emptyDay.list, Type.Normal)).toEqual([]);
  });

  it("No inspections of the Type found.", () => {
    expect(filter(inspections.normalDay.list, Type.Recovered).length).toBe(0);
  });

  it("No inspections found.", () => {
    expect(filter(inspections.normalDay.list, Type.Recovered)).toEqual([]);
  });

  it("Filter the Normal type.", () => {
    expect(filter(inspections.normalDay.list, Type.Normal).length).toBe(
      inspections.normalDay.normal
    );
  });

  it(`Filter the ${Type.Closed} type.`, () => {
    expect(filter(inspections.normalDay.list, Type.Closed).length).toBe(
      inspections.normalDay.closed
    );
  });

  it(`Filter the ${Type.Recovered} type.`, () => {
    expect(
      filter(inspections.normalDayRecovered.list, Type.Recovered).length
    ).toBe(inspections.normalDayRecovered.recovered);
  });

  it(`Filter the ${Type.Recovered} type.`, () => {
    expect(filter(inspections.normalDayRecovered.list, Type.Recovered)).toEqual(
      [
        {
          index: 3,
          type: Type.Recovered,
          period: 0,
          start: 0,
          stop: 0,
        },
        {
          index: 9,
          type: Type.Recovered,
          period: 0,
          start: 0,
          stop: 0,
        },
      ]
    );
  });
});

describe("orderByStartTime()", () => {
  it("Empty list.", () => {
    expect(orderByStartTime([])).toEqual([]);
  });

  it("First is bigger.", () => {
    expect(orderByStartTime([periods.second, periods.first])).toEqual([
      periods.first,
      periods.second,
    ]);
  });

  it("First is smaller.", () => {
    expect(orderByStartTime([periods.first, periods.second])).toEqual([
      periods.first,
      periods.second,
    ]);
  });

  it("Both are equal.", () => {
    expect(orderByStartTime([periods.first, periods.first])).toEqual([
      periods.first,
      periods.first,
    ]);
  });

  it("Multiple values.", () => {
    expect(
      orderByStartTime([
        <Time>{ start: 5 },
        <Time>{ start: 3 },
        <Time>{ start: 9 },
        <Time>{ start: 1 },
        <Time>{ start: 99 },
        <Time>{ start: -4 },
      ])
    ).toEqual([
      { start: -4 },
      { start: 1 },
      { start: 3 },
      { start: 5 },
      { start: 9 },
      { start: 99 },
    ]);
  });
});
