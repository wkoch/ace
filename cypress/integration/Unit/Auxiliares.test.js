import {
    contaFechadas,
    contaNormais,
    contaRecuperadas,
    estáContidoEm,
    filtrar,
    íconeDaVistoria
} from "../../../src/lib/Auxiliares";
import { ÍCONE, TEXTO, TIPO } from "../../../src/data/Constantes";

// Funções indiretas, usadas pelas funções principais


describe("estáContidoEm()", () => {
    context("Bloco horário está contido em outro bloco", () => {
        let existente = { tipo: TEXTO.CHUVA, início: 3, fim: 6 };

        it("Verdadeiro para horários iguais", () => {
            let novo = existente;
            expect(estáContidoEm(novo, existente)).to.be.true;
            expect(estáContidoEm(existente, novo)).to.be.true;
        })
        it("Existente está contido no novo", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 1, fim: 10 };
            expect(estáContidoEm(existente, novo)).to.be.true;
        })
        it("Novo está contido no existente", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 4, fim: 5 };
            expect(estáContidoEm(novo, existente)).to.be.true;
        })
        it("Novo intercede o existente", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 1, fim: 4 };
            expect(estáContidoEm(novo, existente)).to.be.false;
        })
        it("Novo extrapola o existente", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 4, fim: 8 };
            expect(estáContidoEm(novo, existente)).to.be.false;
        })
        it("Existente intercede o novo", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 5, fim: 10 };
            expect(estáContidoEm(existente, novo)).to.be.false;
        })
        it("Existente extrapola o novo", () => {
            let novo = { tipo: TEXTO.CHUVA, início: 1, fim: 4 };
            expect(estáContidoEm(existente, novo)).to.be.false;
        })
    })
})


describe("íconeDaVistoria()", () => {
    context("Retorna o ícone correto conforme o Tipo", () => {
        it("Return string vazia para Tipo não identificado", () => {
            expect(íconeDaVistoria({ tipo: "Nenhum" })).to.equal("");
        });
        it("Retorna o ícone de vistoria Normal", () => {
            expect(íconeDaVistoria({ tipo: TIPO.NORMAL })).to.equal(ÍCONE.NORMAL);
        });
        it("Retorna o ícone de vistoria Fechada", () => {
            expect(íconeDaVistoria({ tipo: TIPO.FECHADA })).to.equal(ÍCONE.FECHADA);
        });
        it("Retorna o ícone de vistoria Recuperada", () => {
            expect(íconeDaVistoria({ tipo: TIPO.RECUPERADA })).to.equal(ÍCONE.RECUPERADA);
        });
        it("Retorna o ícone de Almoço", () => {
            expect(íconeDaVistoria({ tipo: TIPO.ALMOÇO })).to.equal(ÍCONE.ALMOÇO);
        });
        it("Retorna o ícone de Chuva", () => {
            expect(íconeDaVistoria({ tipo: TIPO.CHUVA })).to.equal(ÍCONE.CHUVA);
        });
    });
});

describe("filtrar()", () => {
    context("Filtra listas por tipo.", () => {
        it("Retorna uma lista vazia quando a fonte for vazia", () => {
            expect(filtrar([], TIPO.NORMAL)).to.deep.equal([]);
        });
        it("Retorna uma lista vazia quando não houver elementos do tipo", () => {
            expect(filtrar([{ tipo: TIPO.FECHADA }], TIPO.NORMAL)).to.deep.equal([]);
        });
        it("Retorna uma lista com os elementos corretos", () => {
            let fonte = [{ tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.FECHADA }];
            expect(filtrar(fonte, TIPO.FECHADA)).to.deep.equal([{ tipo: TIPO.FECHADA }, { tipo: TIPO.FECHADA }]);
            expect(filtrar(fonte, TIPO.NORMAL)).to.deep.equal([{ tipo: TIPO.NORMAL }, { tipo: TIPO.NORMAL }]);
            expect(filtrar(fonte, TIPO.RECUPERADA)).to.deep.equal([{ tipo: TIPO.RECUPERADA }]);
        });
    });
});

describe("contaNormais()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(contaNormais([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            expect(contaNormais([{ tipo: TIPO.FECHADA }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            let fonte = [{ tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }];
            expect(contaNormais(fonte)).to.equal(3);
        });
    });
});

describe("contaFechadas()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(contaFechadas([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            expect(contaFechadas([{ tipo: TIPO.NORMAL }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            let fonte = [{ tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }];
            expect(contaFechadas(fonte)).to.equal(3);
        });
    });
});

describe("contaRecuperadas()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(contaRecuperadas([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            expect(contaRecuperadas([{ tipo: TIPO.FECHADA }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do tipo", () => {
            let fonte = [{ tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }, { tipo: TIPO.FECHADA }, { tipo: TIPO.NORMAL }, { tipo: TIPO.RECUPERADA }];
            expect(contaRecuperadas(fonte)).to.equal(3);
        });
    });
});

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         });
//     });
// });

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         });
//     });
// });