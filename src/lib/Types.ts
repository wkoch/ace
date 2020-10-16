// Base Types

export type Morning = {
  active: boolean;
  begin: string;
  end: string;
};

export type Afternoon = {
  active: boolean;
  begin: string;
  end: string;
};

export type Day = {
  start: number;
  stop: number;
};

export type Inspection = {
  index: number;
  period: number;
  type: Type.Closed | Type.Normal | Type.Recovered;
  start: number;
  stop: number;
};
export type Inspections = Array<Inspection>;

// Interval: any block of time that the person is not working. Contrary of Period.
export type Interval = {
  type: Type.Lunch | Type.Rain;
  start: number;
  stop: number;
};
export type Intervals = Array<Interval>;

// Period: any block of time that the person is working. Contrary of Interval.
export type Period = {
  index: number;
  start: number;
  stop: number;
  span: number;
};
export type Periods = Array<Period>;

export type Time =
  | Day
  | Partial<Inspection>
  | Partial<Interval>
  | Partial<Period>;
export type Times = Array<Time>;

export enum Type {
  Closed,
  Day,
  Lunch,
  Normal,
  Rain,
  Recovered,
  None,
}

export type hasType = (Inspection | Interval)[];

// TEXT TYPES
type TEXT_AFTERNOON = "Tarde";
type TEXT_CANCEL = "Cancelar";
type TEXT_CLOSE = "Fechar";
type TEXT_CLOSED = "Fechada";
type TEXT_CONFIRM = {
  QUESTION: "Tem certeza que deseja excluir esta vistoria?";
  TITLE: "Excluir Vistoria";
  WARNING: "Esta ação não poderá ser desfeita.";
};
type TEXT_CONTENT = {
  DESCRIPTION: "Não há vistorias registradas no momento.";
  HELP: "Clique nos botões abaixo para adicionar novas vistorias.";
  SUBTITLE: "Calculadora de horários de vistorias";
  TITLE: "Calculadora ACE";
};
type TEXT_DELETE = "Excluir";
type TEXT_END = "Fim";
type TEXT_ENTERED = "Entrada";
type TEXT_EXITED = "Saída";
type TEXT_LOCK = "Bloqueio";
type TEXT_LUNCH = "Almoço";
type TEXT_MENU = "Menu";
type TEXT_MODAL = {
  ERROR_EMPTY: "Preencha os dois horários.";
  ERROR_EQUAL: "Os horários não podem ser iguais.";
  ERROR_INVERTED: "Início deve ser menor que Fim.";
  TEXT: "Marque o horário do período de chuva:";
  TITLE: "Registrar Chuva";
};
type TEXT_MORNING = "Manhã";
type TEXT_NORMAL = "Normal";
type TEXT_OPTIONS = "Opções";
type TEXT_RAIN = "Chuva";
type TEXT_RANDOM = "Aleatoriedade";
type TEXT_RECOVERED = "Recuperada";
type TEXT_SAVE = "Salvar";
type TEXT_START = "Início";
type TEXT_TYPE = "Tipo";
type TEXT_VERSION = "6.0.0";

export type Text = {
  AFTERNOON: TEXT_AFTERNOON;
  CANCEL: TEXT_CANCEL;
  CLOSE: TEXT_CLOSE;
  CLOSED: TEXT_CLOSED;
  CONFIRM: TEXT_CONFIRM;
  CONTENT: TEXT_CONTENT;
  DELETE: TEXT_DELETE;
  END: TEXT_END;
  ENTERED: TEXT_ENTERED;
  EXITED: TEXT_EXITED;
  LOCK: TEXT_LOCK;
  LUNCH: TEXT_LUNCH;
  MENU: TEXT_MENU;
  MODAL: TEXT_MODAL;
  MORNING: TEXT_MORNING;
  NORMAL: TEXT_NORMAL;
  OPTIONS: TEXT_OPTIONS;
  RAIN: TEXT_RAIN;
  RANDOM: TEXT_RANDOM;
  RECOVERED: TEXT_RECOVERED;
  SAVE: TEXT_SAVE;
  START: TEXT_START;
  TYPE: TEXT_TYPE;
  VERSION: TEXT_VERSION;
};
