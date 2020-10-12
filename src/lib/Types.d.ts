// Base Types

// export type Time = { hours: number, minutes: number };

export type Interval = { type: TYPE, start: number, end: number };
export type Intervals = Array<Interval>;

// export type Moment = { start: number, end: number };
// export type Moments = Array<Moment>;

export type Morning = { active: boolean, name: TEXT_MORNING, startTime: string, endTime: string, start: number, end: number, span: number, nextInterval: number | null };
export type Afternoon = { active: boolean, name: TEXT_AFTERNOON, startTime: string, endTime: string, start: number, end: number, span: number, nextInterval: number | null };

export type Period = Morning | Afternoon;
export type Periods = Array<Period>;

export type Inspection = { index: number, period: (TEXT_MORNING | TEXT_AFTERNOON), type: TYPE, start: number, end: number, nextInterval: TYPE | TEXT_NONE };
export type Inspections = Array<Inspection>;

// export type Report = Inspection;
// export type Reports = Array<Report>;

// export type Schedule = Interval | Moment | Period | Morning | Afternoon | Inspection | Report;
// export type Schedules = Array<Schedule>;




// TEXT TYPES
export type TEXT_AFTERNOON = "Tarde";
export type TEXT_CANCEL = "Cancelar";
export type TEXT_CLOSE = "Fechar";
export type TEXT_CLOSED = "Fechada";
export type TEXT_CONFIRM = { QUESTION: "Tem certeza que deseja excluir esta vistoria?", TITLE: "Excluir Vistoria", WARNING: "Esta ação não poderá ser desfeita." };
export type TEXT_CONTENT = { DESCRIPTION: "Não há vistorias registradas no momento.", HELP: "Clique nos botões abaixo para adicionar novas vistorias.", SUBTITLE: "Calculadora de horários de vistorias", TITLE: "Calculadora ACE" };
export type TEXT_DELETE = "Excluir";
export type TEXT_END = "Fim";
export type TEXT_ENTERED = "Entrada";
export type TEXT_EXITED = "Saída";
export type TEXT_LOCK = "Bloqueio";
export type TEXT_LUNCH = "Almoço";
export type TEXT_MENU = "Menu";
export type TEXT_MODAL = { ERROR_EMPTY: "Preencha os dois horários.", ERROR_EQUAL: "Os horários não podem ser iguais.", ERROR_INVERTED: "Início deve ser menor que Fim.", TEXT: "Marque o horário do período de chuva:", TITLE: "Registrar Chuva", };
export type TEXT_MORNING = "Manhã";
export type TEXT_NONE = "NONE";
export type TEXT_NORMAL = "Normal";
export type TEXT_OPTIONS = "Opções";
export type TEXT_RAIN = "Chuva";
export type TEXT_RANDOM = "Aleatoriedade";
export type TEXT_RECOVERED = "Recuperada";
export type TEXT_SAVE = "Salvar";
export type TEXT_START = "Início";
export type TEXT_TYPE = "Tipo";
export type TEXT_VERSION = "6.0.0";

export type TEXT = {
    AFTERNOON: TEXT_AFTERNOON,
    CANCEL: TEXT_CANCEL,
    CLOSE: TEXT_CLOSE,
    CLOSED: TEXT_CLOSED,
    CONFIRM: TEXT_CONFIRM,
    CONTENT: TEXT_CONTENT,
    DELETE: TEXT_DELETE,
    END: TEXT_END,
    ENTERED: TEXT_ENTERED,
    EXITED: TEXT_EXITED,
    LOCK: TEXT_LOCK,
    LUNCH: TEXT_LUNCH,
    MENU: TEXT_MENU,
    MODAL: TEXT_MODAL,
    MORNING: TEXT_MORNING,
    NONE: TEXT_NONE,
    NORMAL: TEXT_NORMAL,
    OPTIONS: TEXT_OPTIONS,
    RAIN: TEXT_RAIN,
    RANDOM: TEXT_RANDOM,
    RECOVERED: TEXT_RECOVERED,
    SAVE: TEXT_SAVE,
    START: TEXT_START,
    TYPE: TEXT_TYPE,
    VERSION: TEXT_VERSION
};

export type TYPE = TEXT_CLOSED | TEXT_LUNCH | TEXT_NORMAL | TEXT_RAIN | TEXT_RECOVERED;


// export type TYPE = {
//     CLOSED: TEXT_CLOSED,
//     LUNCH: TEXT_LUNCH,
//     NORMAL: TEXT_NORMAL,
//     RAIN: TEXT_RAIN,
//     RECOVERED: TEXT_RECOVERED
// }