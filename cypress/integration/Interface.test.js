import {
    adicionaChuva,
} from "../../src/lib/Interface";
import { TEXTO } from "../../src/data/Constantes";

describe("adicionaChuva()", () => {
    context("Adiciona um bloco de chuva a lista", () => {
        it("Primeira chuva", () => {
            let novo = { tipo: TEXTO.CHUVA, inicio: 8, fim: 9 };
            let resultado = [novo];
            expect(adicionaChuva([], novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, sem interseção", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 9 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 10, fim: 11 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 9 }, { tipo: TEXTO.CHUVA, inicio: 10, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, novo contido em chuva existente", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 11 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 9, fim: 10 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, chuva contido no novo", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 10 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 8, fim: 11 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, começa dentro, termina depois", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 11 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 9, fim: 12 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 12 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas, com interseção, começa antes, termina dentro", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 8, fim: 11 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 7, fim: 10 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 7, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
        it("Duas chuvas sequenciais dentro do período", () => {
            let chuvas = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 10 }];
            let novo = { tipo: TEXTO.CHUVA, inicio: 10, fim: 11 };
            let resultado = [{ tipo: TEXTO.CHUVA, inicio: 9, fim: 11 }];
            expect(adicionaChuva(chuvas, novo)).to.deep.equal(resultado);
        })
    })
})
