// DADOS GERAIS
export let Geral = {
    vistorias: [],
    periodos: [],
    chuvas: [],
};

export let modal = { ativo: false };


export const NORMAL = "normal";
export const FECHADA = "fechada";
export const RECUPERADA = "recuperada";


// DADOS DA MANHÃ
export let Manha = {
    nome: "Manhã",
    vistorias: [],
    normais: 0,
    fechadas: 0,
    recuperadas: 0,
    ativo: true,
    inicio: "08:40",
    fim: "11:20",
    duracao: 0,
    media: 0,
    sobra: {
        individual: 0,
        acumulada: 0
    }
}


// DADOS DA TARDE
export let Tarde = {
    nome: "Tarde",
    vistorias: [],
    normais: 0,
    fechadas: 0,
    recuperadas: 0,
    ativo: true,
    inicio: "14:20",
    fim: "17:20",
    duracao: 0,
    media: 0,
    sobra: {
        individual: 0,
        acumulada: 0
    }
}