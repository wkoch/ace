export function comparaPorHoraInicial(a, b) {
    const elementoA = a.inicio;
    const elementoB = b.inicio;

    let comparacao = 0;
    if (elementoA > elementoB) {
        comparacao = 1;
    } else if (elementoA < elementoB) {
        comparacao = -1;
    }
    return comparacao;
}

export function horarioDoDia(manha, tarde) {
    if (manha.ativo && tarde.ativo) {
        return { inicio: manha.inicio, fim: tarde.fim };
    } else if (manha.ativo) {
        return { inicio: manha.inicio, fim: manha.fim };
    } else {
        return { inicio: tarde.inicio, fim: tarde.fim };
    }
}

export function horaEntre(h, a, b = null) {
    if (typeof a == "object" && b == null) {
        return (h >= a.inicio && h <= a.fim);
    } else {
        return (h >= a && h <= b);
    }
}

export function processaIntervalos(chuvas, manha, tarde) {
    let resultado = [];
    let almoco = {};

    if (manha.ativo && tarde.ativo) {
        // Só existe almoço quando tiver dois períodos ativos.
        almoco = {
            tipo: "almoço",
            inicio: manha.fim,
            fim: tarde.inicio
        };
        resultado.push(almoco);

        if (chuvas.length > 0) {
            chuvas.forEach(chuva => {
                let novoChuva = chuva;
                if (horaEntre(chuva.inicio, manha.inicio, manha.fim) && horaEntre(chuva.fim, almoco.inicio, almoco.fim)) {
                    // Começa durante a manhã e termina durante o almoço;
                    novoChuva.fim = almoco.inicio;
                    resultado.push(novoChuva);
                } else if (horaEntre(chuva.inicio, manha.inicio, manha.fim) && horaEntre(chuva.fim, tarde.inicio, tarde.fim)) {
                    // Começa durante a manhã e termina durante a tarde.

                    // Divide em dois blocos
                    // Um bloco antes do almoço
                    novoChuva.fim = almoco.inicio;
                    resultado.push(novoChuva);
                    // Outro bloco depois do almoço
                    novoChuva.inicio = almoco.fim;
                    novoChuva.fim = chuva.fim;
                    resultado.push(novoChuva);
                } else if (horaEntre(chuva.inicio, almoco.inicio, almoco.fim) && horaEntre(chuva.fim, almoco.inicio, almoco.fim)) {
                    // Começa durante o almoço e termina durante o almoço.
                    // Ignora o bloco de chuva.
                } else if (horaEntre(chuva.inicio, almoco.inicio, almoco.fim) && horaEntre(chuva.fim, tarde.inicio, tarde.fim)) {
                    // Começa durante o almoço e termina a tarde.
                    novoChuva.inicio = almoco.fim;
                    resultado.push(novoChuva);
                } else {
                    // Começa e termina dentro do período.
                    resultado.push(novoChuva);
                }
            });
        }
    } else {
        if (chuvas.length > 0) {
            chuvas.forEach(chuva => {
                resultado.push(chuva);
            });
        }
    }

    if (chuvas.length > 0) {
        return resultado.sort(comparaPorHoraInicial);
    } else {
        return resultado;
    }
}

export function estaContidoEm(objeto1, objeto2) {
    return (horaEntre(objeto1.inicio, objeto2) && horaEntre(objeto1.fim, objeto2));
}

export function adicionaChuva(chuvas, novo) {
    let novoChuvas = [];
    let intercede = false;

    if (chuvas.length > 0) {
        chuvas.forEach(chuva => {
            // Unir interseções
            if (estaContidoEm(novo, chuva)) {
                // Novo está dentro da chuva existente.
                novoChuvas.push(chuva);
                intercede = true;
            } else if (estaContidoEm(chuva, novo)) {
                // Chuva existente está dentro da nova Chuva.
                novoChuvas.push(novo);
                intercede = true;
            } else if (horaEntre(novo.inicio, chuva) && novo.fim > chuva.fim) {
                // Bloco começa dentro e termina depois da chuva existente.
                let novoChuva = chuva;
                novoChuva.fim = novo.fim;
                novoChuvas.push(chuva);
                intercede = true;
            } else if (novo.inicio < chuva.inicio && horaEntre(novo.fim, chuva)) {
                // Bloco começa antes e termina dentro da chuva existente.
                let novoChuva = chuva;
                novoChuva.inicio = novo.inicio;
                novoChuvas.push(chuva);
                intercede = true;
            } else {
                // Não intercede, adiciona normalmente.
                novoChuvas.push(chuva);
            }
        });
    }

    if (!intercede) {
        novoChuvas.push(novo);
    }

    return (chuvas = novoChuvas.sort(comparaPorHoraInicial));
}

export function subtraiIntervalos(dia, intervalos) {
    let novoDia = [];

    if (intervalos.length > 0) {
        intervalos.forEach(intervalo => {

        });
    } else {
        return dia;
    }
}

export function processaPeriodos(manha, tarde) {
    // Pega o horário de trabalho total do dia
    let dia = horarioDoDia(manha, tarde);

    // gera os periodos sem intervalos
    // subtraiIntervalos();
}