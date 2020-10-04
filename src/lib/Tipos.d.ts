// Tipos simples
export type Hora = number;
export type Lista<T> = Array<T>;


// Tipos Complexos (Objetos e Listas)
export type Horário = { horas: number, minutos: number };

export type Intervalo = { tipo: ("Chuva" | "Almoço"), início: Hora, fim: Hora };
export type Intervalos = Lista<Intervalo>;

export type Momento = { início: Hora, fim: Hora };
export type Momentos = Lista<Momento>;

export type Período = { período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };
export type Períodos = Lista<Período>;

export type Vistoria = { id: number, período: ("Manhã" | "Tarde"), tipo: ("Normal" | "Fechada" | "Recuperada"), início: Hora, fim: Hora };
export type Vistorias = Lista<Vistoria>;

export type TipoVistoria = { tipo: ("Normal" | "Fechada" | "Recuperada") };
export type TipoVistorias = Lista<TipoVistoria>;

export type Manhã = { ativo: boolean, período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };
export type Tarde = { ativo: boolean, período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };

export type Tempo = Intervalo | Momento | Período | Manhã | Tarde | Vistoria;
export type Tempos = Intervalos | Momentos | Períodos | Lista<Manhã> | Lista<Tarde>;

export type Relatório = Intervalo | Vistoria;
export type Relatórios = Lista<Relatório>;