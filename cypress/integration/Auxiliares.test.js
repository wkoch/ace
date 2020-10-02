import {
    estaContidoEm
} from "../../src/lib/Auxiliares";

// Funções indiretas, usadas pelas funções principais


describe("estaContidoEm()", () => {
    context("Bloco horário está contido em outro bloco", () => {
        it("Verdadeiro para horários iguais", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 6 };
            let novo = { tipo: "chuva", inicio: 5, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.true;
            expect(estaContidoEm(existente, novo)).to.be.true;
        })
        it("Existente está contido no novo", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 6 };
            let novo = { tipo: "chuva", inicio: 1, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.true;
        })
        it("Novo está contido no existente", () => {
            let existente = { tipo: "chuva", inicio: 1, fim: 10 };
            let novo = { tipo: "chuva", inicio: 5, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.true;
        })
        it("Novo intercede o existente", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 10 };
            let novo = { tipo: "chuva", inicio: 4, fim: 6 };
            expect(estaContidoEm(novo, existente)).to.be.false;
        })
        it("Novo extrapola o existente", () => {
            let existente = { tipo: "chuva", inicio: 5, fim: 10 };
            let novo = { tipo: "chuva", inicio: 6, fim: 12 };
            expect(estaContidoEm(novo, existente)).to.be.false;
        })
        it("Existente intercede o novo", () => {
            let existente = { tipo: "chuva", inicio: 4, fim: 6 };
            let novo = { tipo: "chuva", inicio: 5, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.false;
        })
        it("Existente extrapola o novo", () => {
            let existente = { tipo: "chuva", inicio: 6, fim: 12 };
            let novo = { tipo: "chuva", inicio: 5, fim: 10 };
            expect(estaContidoEm(existente, novo)).to.be.false;
        })
    })
})


// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })

// describe("()", () => {
//     context(".", () => {
//         it("", () => {
//             expect().to.equal();
//         })
//     })
// })