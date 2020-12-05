import type { Text } from "../lib/Types";

export const TEXT: Text = {
  AFTERNOON: "Tarde",
  CANCEL: "Cancelar",
  CLOSE: "Fechar",
  CLOSED: "Fechada",
  CONFIRM: {
    QUESTION: "Tem certeza que deseja excluir esta vistoria?",
    TITLE: "Excluir Vistoria",
    WARNING: "Esta ação não poderá ser desfeita.",
  },
  CONTENT: {
    DESCRIPTION: "Não há vistorias registradas no momento.",
    HELP: "Clique nos botões abaixo para adicionar novas vistorias.",
    SUBTITLE: "Calculadora de horários de vistorias",
    TITLE: "Calculadora ACE",
  },
  DELETE: "Excluir",
  END: "Fim",
  ENTERED: "Entrada",
  EXITED: "Saída",
  LOCK: "Bloqueio",
  LUNCH: "Almoço",
  MENU: "Menu",
  MODAL: {
    ERROR_EMPTY: "Preencha os dois horários.",
    ERROR_EQUAL: "Os horários não podem ser iguais.",
    ERROR_INVERTED: "Início deve ser menor que Fim.",
    TEXT: "Marque o horário do período de chuva:",
    TITLE: "Registrar Chuva",
  },
  MORNING: "Manhã",
  NORMAL: "Normal",
  OPTIONS: "Opções",
  RAIN: "Chuva",
  RANDOM: "Aleatoriedade",
  RECOVERED: "Recuperada",
  SAVE: "Salvar",
  START: "Início",
  TYPE: "Tipo",
  VERSION: "6.1.1",
};

export const TIME: { CLOSED: number } = {
  CLOSED: 180000, // 3 Minutos in miliseconds
};
