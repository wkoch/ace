// Tipos simples
export type Número = number;
export type Texto = string;
export type Hora = Número;
export type Lista<T> = Array<T>;


// Tipos Complexos (Objetos e Listas)
export type Intervalo = { tipo: ("chuva" | "almoço"), inicio: Hora, fim: Hora };
export type Intervalos = Lista<Intervalo>;

export type Momento = { inicio: Hora, fim: Hora };
export type Momentos = Lista<Momento>;

export type Período = { periodo: ("Manhã" | "Tarde"), inicio: Hora, fim: Hora };
export type Períodos = Lista<Período>;

export type Vistoria = { index: Número, periodo: ("Manhã" | "Tarde"), tipo: string, inicio: Hora, fim: Hora };
export type Vistorias = Lista<Vistoria>;

export type TipoVistoria = { tipo: string };
export type TipoVistorias = Lista<TipoVistoria>;

export type Manhã = { ativo: boolean, periodo: ("Manhã" | "Tarde"), inicio: Hora, fim: Hora };
export type Tarde = { ativo: boolean, periodo: ("Manhã" | "Tarde"), inicio: Hora, fim: Hora };

export type Tempo = Intervalo | Momento | Período | Manhã | Tarde;
export type Tempos = Intervalos | Momentos | Períodos | Lista<Manhã> | Lista<Tarde>;