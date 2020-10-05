// SIMPLE TYPES
export type Minutes = number;

// COMPLEX TYPES
export type Time = { hours: number, minutes: number };

export type Interval = { type: TYPE, start: Minutes, end: Minutes };
export type Intervals = Array<Interval>;

export type Moment = { start: Minutes, end: Minutes };
export type Moments = Array<Moment>;

export type Period = { period: (TEXT_MORNING | TEXT_AFTERNOON), start: Minutes, end: Minutes };
export type Periods = Array<Period>;

export type Inspection = { id: number, period: (TEXT_MORNING | TEXT_AFTERNOON), type: TYPE, start: Minutes, end: Minutes };
export type Inspections = Array<Inspection>;

export type Morning = { active: boolean, period: (TEXT_MORNING | TEXT_AFTERNOON), start: Minutes, end: Minutes };
export type Afternoon = { active: boolean, period: (TEXT_MORNING | TEXT_AFTERNOON), start: Minutes, end: Minutes };

export type Report = Interval | Inspection;
export type Reports = Array<Report>;

export type Schedule = Interval | Moment | Period | Morning | Afternoon | Inspection | Report;
export type Schedules = Array<Schedule>;




// CONSTANTS TYPES
export type TEXT_RANDOM = "Aleatoriedade";
export type TEXT_LUNCH = "Almoço";
export type TEXT_LOCK = "Bloqueio";
export type TEXT_CANCEL = "Cancelar";
export type TEXT_RAIN = "Chuva";
export type TEXT_CONTENT = {
    HELP: string,
    DESCRIPTION: string,
    SUBTITLE: string,
    TITLE: string
};
export type TEXT_ENTERED = "Entrada";
export type TEXT_CLOSED = "Fechada";
export type TEXT_CLOSE = "Fechar";
export type TEXT_END = "Fim";
export type TEXT_START = "Início";
export type TEXT_MORNING = "Manhã";
export type TEXT_MENU = "Menu";
export type TEXT_MODAL = {
    ERROR_EQUAL: string,
    ERROR_INVERTED: string,
    ERROR_EMPTY: string,
    TEXT: string,
    TITLE: string
};
export type TEXT_NORMAL = "Normal";
export type TEXT_OPTIONS = "Opções";
export type TEXT_RECOVERED = "Recuperada";
export type TEXT_EXITED = "Saída";
export type TEXT_SAVE = "Salvar";
export type TEXT_AFTERNOON = "Tarde";
export type TEXT_TYPE = "Tipo";

export type TEXT = {
    AFTERNOON: TEXT_AFTERNOON,
    CANCEL: TEXT_CANCEL,
    CLOSE: TEXT_CLOSE,
    CLOSED: TEXT_CLOSED,
    CONTENT: TEXT_CONTENT,
    END: TEXT_END,
    ENTERED: TEXT_ENTERED,
    EXITED: TEXT_EXITED,
    LOCK: TEXT_LOCK,
    LUNCH: TEXT_LUNCH,
    MENU: TEXT_MENU,
    MODAL: TEXT_MODAL,
    MORNING: TEXT_MORNING,
    NORMAL: TEXT_NORMAL,
    OPTIONS: TEXT_OPTIONS,
    RAIN: TEXT_RAIN,
    RANDOM: TEXT_RANDOM,
    RECOVERED: TEXT_RECOVERED,
    SAVE: TEXT_SAVE,
    START: TEXT_START,
    TYPE: TEXT_TYPE
};

export type TYPE = {
    CLOSED: TEXT_CLOSED,
    LUNCH: TEXT_LUNCH,
    NORMAL: TEXT_NORMAL,
    RAIN: TEXT_RAIN,
    RECOVERED: TEXT_RECOVERED
}



export type Type = TYPE;

export type ICON = {
    LUNCH: "utensils",
    RAIN: "umbrella",
    CLOSED: "times-circle",
    NORMAL: "check-circle",
    RECOVERED: "recycle"
}