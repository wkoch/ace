import {
    countByType,
    contains,
    filter,
    inspectionIcon
} from "../../../src/lib/Helpers";
import { ICON, TEXT, TYPE } from "../../../src/data/Data";

// Funções indiretas, usadas pelas funções principais


describe("contains()", () => {
    context("Bloco horário está contido em outro bloco", () => {
        let existent = { type: TEXT.RAIN, start: 3, end: 6 };

        it("Verdadeiro para horários iguais", () => {
            let newOne = existent;
            expect(contains(newOne, existent)).to.be.true;
            expect(contains(existent, newOne)).to.be.true;
        })
        it("Existente está contido no newOne", () => {
            let newOne = { type: TEXT.RAIN, start: 1, end: 10 };
            expect(contains(existent, newOne)).to.be.true;
        })
        it("Novo está contido no existent", () => {
            let newOne = { type: TEXT.RAIN, start: 4, end: 5 };
            expect(contains(newOne, existent)).to.be.true;
        })
        it("Novo intercede o existent", () => {
            let newOne = { type: TEXT.RAIN, start: 1, end: 4 };
            expect(contains(newOne, existent)).to.be.false;
        })
        it("Novo extrapola o existent", () => {
            let newOne = { type: TEXT.RAIN, start: 4, end: 8 };
            expect(contains(newOne, existent)).to.be.false;
        })
        it("Existente intercede o newOne", () => {
            let newOne = { type: TEXT.RAIN, start: 5, end: 10 };
            expect(contains(existent, newOne)).to.be.false;
        })
        it("Existente extrapola o newOne", () => {
            let newOne = { type: TEXT.RAIN, start: 1, end: 4 };
            expect(contains(existent, newOne)).to.be.false;
        })
    })
})


describe("inspectionIcon()", () => {
    context("Retorna o ícone correto conforme o Tipo", () => {
        it("Return string vazia para Tipo não identificado", () => {
            expect(inspectionIcon({ type: "Nenhum" })).to.equal("");
        });
        it("Retorna o ícone de vistoria Normal", () => {
            expect(inspectionIcon({ type: TYPE.NORMAL })).to.equal(ICON.NORMAL);
        });
        it("Retorna o ícone de vistoria Fechada", () => {
            expect(inspectionIcon({ type: TYPE.CLOSED })).to.equal(ICON.CLOSED);
        });
        it("Retorna o ícone de vistoria Recuperada", () => {
            expect(inspectionIcon({ type: TYPE.RECOVERED })).to.equal(ICON.RECOVERED);
        });
        it("Retorna o ícone de Almoço", () => {
            expect(inspectionIcon({ type: TYPE.LUNCH })).to.equal(ICON.LUNCH);
        });
        it("Retorna o ícone de Chuva", () => {
            expect(inspectionIcon({ type: TYPE.RAIN })).to.equal(ICON.RAIN);
        });
    });
});

describe("filtrar()", () => {
    context("Filtra listas por type.", () => {
        it("Retorna uma lista vazia quando a fonte for vazia", () => {
            expect(filter([], TYPE.NORMAL)).to.deep.equal([]);
        });
        it("Retorna uma lista vazia quando não houver elementos do type", () => {
            expect(filter([{ type: TYPE.CLOSED }], TYPE.NORMAL)).to.deep.equal([]);
        });
        it("Retorna uma lista com os elementos corretos", () => {
            let fonte = [{ type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.NORMAL }, { type: TYPE.CLOSED }];
            expect(filter(fonte, TYPE.CLOSED)).to.deep.equal([{ type: TYPE.CLOSED }, { type: TYPE.CLOSED }]);
            expect(filter(fonte, TYPE.NORMAL)).to.deep.equal([{ type: TYPE.NORMAL }, { type: TYPE.NORMAL }]);
            expect(filter(fonte, TYPE.RECOVERED)).to.deep.equal([{ type: TYPE.RECOVERED }]);
        });
    });
});

describe("countByType()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(countByType([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            expect(countByType([{ type: TYPE.CLOSED }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            let fonte = [{ type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }];
            expect(countByType(fonte)).to.equal(3);
        });
    });
});

describe("countByType()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(countByType([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            expect(countByType([{ type: TYPE.NORMAL }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            let fonte = [{ type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }];
            expect(countByType(fonte)).to.equal(3);
        });
    });
});

describe("countByType()", () => {
    context("Conta as vistorias normais", () => {
        it("Retorna zero quando a lista for vazia", () => {
            expect(countByType([])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            expect(countByType([{ type: TYPE.CLOSED }])).to.equal(0);
        });
        it("Retorna zero quando não houver itens do type", () => {
            let fonte = [{ type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }, { type: TYPE.CLOSED }, { type: TYPE.NORMAL }, { type: TYPE.RECOVERED }];
            expect(countByType(fonte)).to.equal(3);
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