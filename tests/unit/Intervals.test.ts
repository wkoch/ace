import { describe, it, expect } from "@playwright/test";
import { getLunchInterval, joinIntervals, newInterval } from "../../src/lib/Intervals";
import { morning, afternoon } from "../testData";
import { stringToTime } from "../../src/lib/Time";
import { Type } from "../../src/lib/Types";
import type { Interval, Intervals } from "../../src/lib/Types";

describe("getLunchInterval()", () => {
  it("Both periods are active.", () => {
    let result: Interval = {
      type: Type.Lunch,
      start: stringToTime(morning.on.end),
      stop: stringToTime(afternoon.on.begin),
    };
    expect(getLunchInterval(morning.on, afternoon.on)).toEqual(result);
  });

  it("Only morning active.", () => {
    let result: Interval = {
      type: Type.Lunch,
      start: 0,
      stop: 0,
    };
    expect(getLunchInterval(morning.on, afternoon.off)).toEqual(result);
  });

  it("Only afternoon active.", () => {
    let result: Interval = {
      type: Type.Lunch,
      start: 0,
      stop: 0,
    };
    expect(getLunchInterval(morning.off, afternoon.on)).toEqual(result);
  });
});


describe("joinIntervals()", () => {
  it("No intervals returns empty list.", () => {
    expect(joinIntervals([], [])).toEqual([]);
  });

  it("Joins one with two, result is ordered by Start time.", () => {
    let first: Intervals = [{
      type: Type.Lunch,
      start: 12,
      stop: 13,
    }];
    let second: Intervals = [
      {
        type: Type.Rain,
        start: 9,
        stop: 10,
      },
      {
        type: Type.Rain,
        start: 15,
        stop: 16,
      }
    ];
    let result: Intervals = [
      {
        type: Type.Rain,
        start: 9,
        stop: 10,
      },
      {
        type: Type.Lunch,
        start: 12,
        stop: 13,
      },
      {
        type: Type.Rain,
        start: 15,
        stop: 16,
      }
    ];
    expect(joinIntervals(first, second)).toEqual(result);
  });
});


describe("newInterval()", () => {
  let luchOnly: Intervals = [{ type: Type.Lunch, start: 11, stop: 14 }];

  it("Lista vazia, apenas adiciona.", () => {
    let result: Interval = { type: Type.Rain, start: 10, stop: 12 };
    expect(newInterval([], result)).toEqual([result]);
  });

  // Teste com almoço
  it("Tem almoço, adiciona chuva antes do almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 9, stop: 10 };
    let result: Intervals = [newOne, ...luchOnly];
    expect(newInterval(luchOnly, newOne)).toEqual(result);
  });

  it("Tem almoço, adiciona chuva depois do almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 15, stop: 16 };
    let result: Intervals = [...luchOnly, newOne];
    expect(newInterval(luchOnly, newOne)).toEqual(result);
  });

  it("Tem almoço, adiciona chuva intercedendo o almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 10, stop: 12 };
    let result: Intervals = [
      { type: Type.Rain, start: 10, stop: 11 },
      ...luchOnly,
    ];
    expect(newInterval(luchOnly, newOne)).toEqual(result);
  });

  it("Tem almoço, adiciona chuva extrapolando o almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 13, stop: 17 };
    let result: Intervals = [
      ...luchOnly,
      { type: Type.Rain, start: 14, stop: 17 },
    ];
    expect(newInterval(luchOnly, newOne)).toEqual(result);
  });

  // // Testes com almoço e chuva
  let lunchAndRain: Intervals = [
    { type: Type.Rain, start: 9, stop: 11 },
    { type: Type.Lunch, start: 11, stop: 14 },
  ];
  it("Tem almoço e chuva, adiciona chuva antes da chuva e almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 7, stop: 8 };
    let result: Intervals = [newOne, ...lunchAndRain];
    expect(newInterval(lunchAndRain, newOne)).toEqual(result);
  });

  it("Tem almoço e chuva, adiciona chuva depois do almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 15, stop: 16 };
    let result: Intervals = [...lunchAndRain, newOne];
    expect(newInterval(lunchAndRain, newOne)).toEqual(result);
  });

  it("Tem almoço e chuva, adiciona chuva extrapolando chuva e intercedendo o almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 10, stop: 12 };
    expect(newInterval(lunchAndRain, newOne)).toEqual(lunchAndRain);
  });

  it("Tem almoço e chuva, adiciona chuva extrapolando o almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 13, stop: 17 };
    let result: Intervals = [
      ...lunchAndRain,
      { type: Type.Rain, start: 14, stop: 17 },
    ];
    expect(newInterval(lunchAndRain, newOne)).toEqual(result);
  });

  it("Tem almoço e chuva, adiciona chuva dentro da chuva e almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 10, stop: 12 };
    expect(newInterval(lunchAndRain, newOne)).toEqual(lunchAndRain);
  });

  it("Tem almoço e chuva, adiciona chuva intercedendo a chuva antes do almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 8, stop: 10 };
    let result: Intervals = [
      { type: Type.Rain, start: 8, stop: 11 },
      { type: Type.Lunch, start: 11, stop: 14 },
    ];
    expect(newInterval(lunchAndRain, newOne)).toEqual(result);
  });

  it("Tem almoço e chuva, adiciona chuva cobrindo chuva e almoço", () => {
    let newOne: Interval = { type: Type.Rain, start: 8, stop: 15 };
    let result: Intervals = [
      { type: Type.Rain, start: 8, stop: 11 },
      { type: Type.Lunch, start: 11, stop: 14 },
      { type: Type.Rain, start: 14, stop: 15 },
    ];
    expect(newInterval(lunchAndRain, newOne)).toEqual(result);
  });

  // // Testes com Chuvas
  let rainOnly: Intervals = [
    { type: Type.Rain, start: 8, stop: 9 },
    { type: Type.Rain, start: 11, stop: 14 },
  ];
  it("Tem chuvas, adiciona chuva antes", () => {
    let newOne: Interval = { type: Type.Rain, start: 6, stop: 7 };
    let result: Intervals = [newOne, ...rainOnly];
    expect(newInterval(rainOnly, newOne)).toEqual(result);
  });

  it("Tem chuvas, adiciona chuva depois", () => {
    let newOne: Interval = { type: Type.Rain, start: 15, stop: 16 };
    let result: Intervals = [...rainOnly, newOne];
    expect(newInterval(rainOnly, newOne)).toEqual(result);
  });

  it("Tem chuvas, adiciona chuva intercedendo chuva", () => {
    let newOne: Interval = { type: Type.Rain, start: 7, stop: 9 };
    let result: Intervals = [
      { type: Type.Rain, start: 7, stop: 9 },
      { type: Type.Rain, start: 11, stop: 14 },
    ];
    expect(newInterval(rainOnly, newOne)).toEqual(result);
  });

  it("Tem chuvas, adiciona chuva extrapolando chuva", () => {
    let newOne: Interval = { type: Type.Rain, start: 13, stop: 17 };
    let result: Intervals = [
      { type: Type.Rain, start: 8, stop: 9 },
      { type: Type.Rain, start: 11, stop: 17 },
    ];
    expect(newInterval(rainOnly, newOne)).toEqual(result);
  });

  it("Tem chuvas, adiciona chuva dentro da chuva", () => {
    let newOne: Interval = { type: Type.Rain, start: 12, stop: 13 };
    expect(newInterval(rainOnly, newOne)).toEqual(rainOnly);
  });

  it("Tem chuvas, adiciona chuva cobrindo chuvas", () => {
    let newOne: Interval = { type: Type.Rain, start: 7, stop: 15 };
    expect(newInterval(rainOnly, newOne)).toEqual([newOne]);
  });
});
