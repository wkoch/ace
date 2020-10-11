/**
* @typedef { import("../src/lib/Types").Inspections } Inspections
* @typedef { import("../src/lib/Types").Period } Period
*/

import { TEXT } from "../src/data/Data";

/** @type {{morningOn: Period, morningOff: Period, afternoonOn: Period, afternoonOff: Period}} */
export const periods = {
    morningOn: {
        active: true,
        name: "Manhã",
        startTime: "08:40",
        endTime: "11:20",
        start: 31200000,
        end: 40800000,
        span: 9600000,
        nextInterval: TEXT.NONE
    },
    morningOff: {
        name: "Manhã",
        active: false,
        startTime: "08:40",
        endTime: "11:20",
        start: 0,
        end: 0,
        span: 0,
        nextInterval: TEXT.NONE
    },
    afternoonOn: {
        name: "Tarde",
        active: true,
        startTime: "14:20",
        endTime: "17:20",
        start: 51600000,
        end: 62400000,
        span: 10800000,
        nextInterval: TEXT.NONE
    },
    afternoonOff: {
        name: "Tarde",
        active: false,
        startTime: "14:20",
        endTime: "17:20",
        start: 0,
        end: 0,
        span: 0,
        nextInterval: TEXT.NONE
    }
};

export const intervals = {
    lunchOnly: {
        list: [
            {
                type: "Lunch",
                startTime: "11:20",
                endTime: "14:20",
                start: 40800000,
                end: 51600000,
                span: 10800000
            }
        ]
    },
    rainOnly: {
        list: [
            {
                type: "Rain",
                startTime: "09:10",
                endTime: "10:02",
                start: 33000000,
                end: 36120000,
                span: 3120000
            }
        ]
    },
    lunchAndRain: {
        list: [
            {
                type: "Rain",
                startTime: "09:10",
                endTime: "10:02",
                start: 33000000,
                end: 36120000,
                span: 3120000
            },
            {
                type: "Lunch",
                startTime: "11:20",
                endTime: "14:20",
                start: 40800000,
                end: 51600000,
                span: 10800000
            }
        ]
    },
    lunchAndRains: {
        list: [
            {
                type: "Rain",
                startTime: "09:10",
                endTime: "10:02",
                start: 33000000,
                end: 36120000,
                span: 3120000
            },
            {
                type: "Rain",
                startTime: "10:35",
                endTime: "11:00",
                start: 38100000,
                end: 39600000,
                span: 1500000
            },
            {
                type: "Lunch",
                startTime: "11:20",
                endTime: "14:20",
                start: 40800000,
                end: 51600000,
                span: 10800000
            },
            {
                type: "Rain",
                startTime: "15:22",
                endTime: "16:09",
                start: 55320000,
                end: 58140000,
                span: 2820000
            }
        ]
    }
};


export const inspections = {
    emptyDay: {
        list: [],
        normal: 0,
        closed: 0,
        recovered: 0
    },
    normalDay: {
        list: [
            {
                index: 0,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 20,
        closed: 15,
        recovered: 0
    },
    normalDayRecovered: {
        list: [
            {
                index: 0,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "R",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "R",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 20,
        closed: 13,
        recovered: 2
    },
    manyClosed: {
        list: [
            {
                index: 0,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 12,
        closed: 23,
        recovered: 0
    }
};


export const report = {
    emptyDay: {
        list: [],
        normal: 0,
        closed: 0,
        recovered: 0
    },
    normalDay: {
        list: [
            {
                index: 0,
                type: "F",
                period: "Manhã",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 20,
        closed: 15,
        recovered: 0
    },
    normalDayRecovered: {
        list: [
            {
                index: 0,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "R",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "R",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 20,
        closed: 13,
        recovered: 2
    },
    manyClosed: {
        list: [
            {
                index: 0,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 1,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 2,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 3,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 4,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 5,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 6,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 7,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 8,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 9,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 10,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 11,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 12,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 13,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 14,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 15,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 16,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 17,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 18,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 19,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 20,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 21,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 22,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 23,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 24,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 25,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 26,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 27,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 28,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 29,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 30,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 31,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 32,
                type: "N",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 33,
                type: "F",
                period: "",
                start: 0,
                end: 0
            },
            {
                index: 34,
                type: "N",
                period: "",
                start: 0,
                end: 0
            }
        ],
        normal: 12,
        closed: 23,
        recovered: 0
    }
};