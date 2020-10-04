// Tipos simples
export type Hora = number;
export type Lista<T> = Array<T>;


// Tipos Complexos (Objetos e Listas)
export type Horário = { horas: number, minutos: number };

export type Tipo = "Normal" | "Fechada" | "Recuperada";

export type Intervalo = { tipo: ("Chuva" | "Almoço"), início: Hora, fim: Hora };
export type Intervalos = Lista<Intervalo>;

export type Momento = { início: Hora, fim: Hora };
export type Momentos = Lista<Momento>;

export type Período = { período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };
export type Períodos = Lista<Período>;

export type Vistoria = { id: number, período: ("Manhã" | "Tarde"), tipo: ("Normal" | "Fechada" | "Recuperada"), início: Hora, fim: Hora };
export type Vistorias = Lista<Vistoria>;

export type TipoVistoria = { id: number, tipo: ("Normal" | "Fechada" | "Recuperada") };
export type TipoVistorias = Lista<TipoVistoria>;

export type Manhã = { ativo: boolean, período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };
export type Tarde = { ativo: boolean, período: ("Manhã" | "Tarde"), início: Hora, fim: Hora };

export type Tempo = Intervalo | Momento | Período | Manhã | Tarde | Vistoria | Relatório;
export type Tempos = Intervalos | Momentos | Períodos | Lista<Manhã> | Lista<Tarde>;

export type Relatório = Intervalo | Vistoria;
export type Relatórios = Lista<Relatório>;


// Tipos das Constantes

export type ALEATORIEDADE = "Aleatoriedade";
export type ALMOÇO = "Almoço";
export type BLOQUEIO = "Bloqueio";
export type CANCELAR = "Cancelar";
export type CHUVA = "Chuva";
export type CONTEÚDO = {
    AJUDA: string,
    DESCRIÇÃO: string,
    SUBTÍTULO: string,
    TÍTULO: string
};
export type ENTRADA = "Entrada";
export type FECHADA = "Fechada";
export type FECHAR = "Fechar";
export type FIM = "Fim";
export type INÍCIO = "Início";
export type MANHÃ = "Manhã";
export type MENU = "Menu";
export type MODAL = {
    ERROIGUAIS: string,
    ERROMENOR: string,
    ERROVAZIO: string,
    TEXTO: string,
    TÍTULO: string
};
export type NORMAL = "Normal";
export type OPÇÕES = "Opções";
export type RECUPERADA = "Recuperada";
export type SAÍDA = "Saída";
export type SALVAR = "Salvar";
export type TARDE = "Tarde";
export type TÉRMINO = "Término";
export type TIPO = "Tipo";

export type TEXTO = {
    ALEATORIEDADE: ALEATORIEDADE,
    ALMOÇO: ALMOÇO,
    BLOQUEIO: BLOQUEIO,
    CANCELAR: CANCELAR,
    CHUVA: CHUVA,
    CONTEÚDO: CONTEÚDO,
    ENTRADA: ENTRADA,
    FECHADA: FECHADA,
    FECHAR: FECHAR,
    FIM: FIM,
    INÍCIO: INÍCIO,
    MANHÃ: MANHÃ,
    MENU: MENU,
    MODAL: MODAL,
    NORMAL: NORMAL,
    OPÇÕES: OPÇÕES,
    RECUPERADA: RECUPERADA,
    SAÍDA: SAÍDA,
    SALVAR: SALVAR,
    TARDE: TARDE,
    TÉRMINO: TÉRMINO,
    TIPO: TIPO
};

export type TIPOVISTORIA = {
    ALMOÇO: ALMOÇO,
    CHUVA: CHUVA,
    FECHADA: FECHADA,
    NORMAL: NORMAL,
    RECUPERADA: RECUPERADA
}

export type ÍCONE = {
    ALMOÇO: "utensils",
    CHUVA: "umbrella",
    FECHADA: "times-circle",
    NORMAL: "check-circle",
    RECUPERADA: "recycle"
}