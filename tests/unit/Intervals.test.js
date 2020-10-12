import { TEXT } from "../../src/data/Data";
import { getLunchInterval, newInterval } from "../../src/lib/Intervals";
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


describe("newInterval()", () => {
    let luchOnly = [{ type: TEXT.LUNCH, start: 11, end: 14 }];

    test('Lista vazia, apenas adiciona.', () => {
        let result = { type: TEXT.RAIN, start: 10, end: 12 };
        expect(newInterval([], result)).toEqual([result]);
    });

    // Teste com almoço
    test('Tem almoço, adiciona chuva antes do almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 9, end: 10 };
        let result = [newOne, ...luchOnly];
        expect(newInterval(luchOnly, newOne)).toEqual(result);
    });

    test('Tem almoço, adiciona chuva depois do almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 15, end: 16 };
        let result = [...luchOnly, newOne];
        expect(newInterval(luchOnly, newOne)).toEqual(result);
    });

    test('Tem almoço, adiciona chuva intercedendo o almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 10, end: 12 };
        let result = [{ type: TEXT.RAIN, start: 10, end: 11 }, ...luchOnly];
        expect(newInterval(luchOnly, newOne)).toEqual(result);
    });

    test('Tem almoço, adiciona chuva extrapolando o almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 13, end: 17 };
        let result = [...luchOnly, { type: TEXT.RAIN, start: 14, end: 17 }];
        expect(newInterval(luchOnly, newOne)).toEqual(result);
    });

    // // Testes com almoço e chuva
    let lunchAndRain = [{ type: TEXT.RAIN, start: 9, end: 11 }, { type: TEXT.LUNCH, start: 11, end: 14 }];
    test('Tem almoço e chuva, adiciona chuva antes da chuva e almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 7, end: 8 };
        let result = [newOne, ...lunchAndRain];
        expect(newInterval(lunchAndRain, newOne)).toEqual(result);
    });

    test('Tem almoço e chuva, adiciona chuva depois do almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 15, end: 16 };
        let result = [...lunchAndRain, newOne];
        expect(newInterval(lunchAndRain, newOne)).toEqual(result);
    });

    test('Tem almoço e chuva, adiciona chuva extrapolando chuva e intercedendo o almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 10, end: 12 };
        expect(newInterval(lunchAndRain, newOne)).toEqual(lunchAndRain);
    });

    test('Tem almoço e chuva, adiciona chuva extrapolando o almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 13, end: 17 };
        let result = [...lunchAndRain, { type: TEXT.RAIN, start: 14, end: 17 }];
        expect(newInterval(lunchAndRain, newOne)).toEqual(result);
    });

    test('Tem almoço e chuva, adiciona chuva dentro da chuva e almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 10, end: 12 };
        expect(newInterval(lunchAndRain, newOne)).toEqual(lunchAndRain);
    });

    test('Tem almoço e chuva, adiciona chuva intercedendo a chuva antes do almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 8, end: 10 };
        let result = [{ type: TEXT.RAIN, start: 8, end: 11 }, { type: TEXT.LUNCH, start: 11, end: 14 }];
        expect(newInterval(lunchAndRain, newOne)).toEqual(result);
    });

    test('Tem almoço e chuva, adiciona chuva cobrindo chuva e almoço', () => {
        let newOne = { type: TEXT.RAIN, start: 8, end: 15 };
        let result = [{ type: TEXT.RAIN, start: 8, end: 11 }, { type: TEXT.LUNCH, start: 11, end: 14 }, { type: TEXT.RAIN, start: 14, end: 15 }];
        expect(newInterval(lunchAndRain, newOne)).toEqual(result);
    });

    // // Testes com Chuvas
    let rainOnly = [{ type: TEXT.RAIN, start: 8, end: 9 }, { type: TEXT.RAIN, start: 11, end: 14 }];
    test('Tem chuvas, adiciona chuva antes', () => {
        let newOne = { type: TEXT.RAIN, start: 6, end: 7 };
        let result = [newOne, ...rainOnly];
        expect(newInterval(rainOnly, newOne)).toEqual(result);
    });

    test('Tem chuvas, adiciona chuva depois', () => {
        let newOne = { type: TEXT.RAIN, start: 15, end: 16 };
        let result = [...rainOnly, newOne];
        expect(newInterval(rainOnly, newOne)).toEqual(result);
    });

    test('Tem chuvas, adiciona chuva intercedendo chuva', () => {
        let newOne = { type: TEXT.RAIN, start: 7, end: 9 };
        let result = [{ type: TEXT.RAIN, start: 7, end: 9 }, { type: TEXT.RAIN, start: 11, end: 14 }];
        expect(newInterval(rainOnly, newOne)).toEqual(result);
    });

    test('Tem chuvas, adiciona chuva extrapolando chuva', () => {
        let newOne = { type: TEXT.RAIN, start: 13, end: 17 };
        let result = [{ type: TEXT.RAIN, start: 8, end: 9 }, { type: TEXT.RAIN, start: 11, end: 17 }];
        expect(newInterval(rainOnly, newOne)).toEqual(result);
    });

    test('Tem chuvas, adiciona chuva dentro da chuva', () => {
        let newOne = { type: TEXT.RAIN, start: 12, end: 13 };
        expect(newInterval(rainOnly, newOne)).toEqual(rainOnly);
    });

    test('Tem chuvas, adiciona chuva cobrindo chuvas', () => {
        let newOne = { type: TEXT.RAIN, start: 7, end: 15 };
        expect(newInterval(rainOnly, newOne)).toEqual([newOne]);
    });
});