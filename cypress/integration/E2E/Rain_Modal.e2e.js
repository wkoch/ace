import { TEXT, TYPE } from "../../../src/data/Data";

describe("Modal funciona corretamente", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Abre e fecha o Modal de Registro de Chuva", () => {
        // Modal está oculto
        cy.modalOculto();

        // Clica no botão adicionar chuva para ativar o Modal.
        cy.get("button#" + TEXT.RAIN).click();
        // Modal está visível
        cy.modalVisível();
        // Fecha modal no X
        cy.get("button#" + TEXT.CLOSE).click();
        // Modal está oculto
        cy.modalOculto();

        // Clica no botão adicionar chuva para ativar o Modal.
        cy.get("button#" + TEXT.RAIN).click();
        // Modal está visível
        cy.modalVisível();
        // Fecha modal no Cancelar
        cy.get("button#" + TEXT.CANCEL).click();
        // Modal está oculto
        cy.modalOculto();
    });

    it("Validação do Modal funciona corretamente", () => {
        // Clica no botão adicionar chuva para ativar o Modal.
        cy.get("button#" + TEXT.RAIN).click();
        // Modal está visível
        cy.modalVisível();
        // Salvar não deve sair do Modal
        cy.get("button#" + TEXT.SAVE).click();
        // Apresenta erro de campos vazios
        cy.contains(TEXT.MODAL.ERROR_EMPTY).should("be.visible");
        // Salvar deve estar desativado
        cy.get("button#" + TEXT.SAVE).should('have.attr', 'disabled');
        cy.get("input#" + TEXT.START).type("11:00");
        // Continua com erro de campos vazios
        cy.contains(TEXT.MODAL.ERROR_EMPTY).should("be.visible");
        cy.get("input#" + TEXT.END).type("09:00");
        // Erro de campos vazios deve sumir
        cy.contains(TEXT.MODAL.ERROR_EMPTY).should("not.be.visible");
        // Erro de campo invertido deve aparecer
        cy.contains(TEXT.MODAL.ERROR_INVERTED).should("be.visible");
        // Salvar deve estar desativado
        cy.get("button#" + TEXT.SAVE).should('have.attr', 'disabled');
        cy.get("input#" + TEXT.START).type("09:25");
        cy.get("input#" + TEXT.END).type("09:25");
        // Erro de campo invertido deve sumir
        cy.contains(TEXT.MODAL.ERROR_EMPTY).should("not.be.visible");
        // Erro de campos iguais deve aparecer
        cy.contains(TEXT.MODAL.ERROR_EQUAL).should("be.visible");
        // Salvar deve estar desativado
        cy.get("button#" + TEXT.SAVE).should('have.attr', 'disabled');
        cy.get("input#" + TEXT.END).type("11:45");
        // Erro de campos iguais deve sumir
        cy.contains(TEXT.MODAL.ERROR_EQUAL).should("not.be.visible");
        // Botão salvar funciona e fecha o modal
        cy.get("button#" + TEXT.SAVE).click();
    });
});

describe("Adiciona period de chuva", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Adiciona um period de chuva", () => {
        cy.adicionaChuva("09:00", "09:45");
        // Bloco de chuva deve estar visível
        cy.contains("09:00").should("be.visible");
        cy.contains("09:45").should("be.visible");
        cy.get(`button#${TYPE.RAIN}`).should("have.attr", "data-badge", 1);
    });

    it("Adiciona periods separados de chuva", () => {
        cy.adicionaChuva("09:00", "09:45");
        cy.adicionaChuva("10:00", "10:30");
        cy.adicionaChuva("10:50", "11:10");
        // Bloco de chuva deve estar visível
        cy.contains("09:00").should("be.visible");
        cy.contains("09:45").should("be.visible");
        cy.contains("10:00").should("be.visible");
        cy.contains("10:30").should("be.visible");
        cy.contains("10:50").should("be.visible");
        cy.contains("11:10").should("be.visible");
        cy.get(`button#${TYPE.RAIN}`).should("have.attr", "data-badge", 3);
    });

    it("Adiciona e unifica periods contíguos de chuva", () => {
        cy.adicionaChuva("09:00", "09:45");
        cy.adicionaChuva("09:30", "10:30");
        cy.adicionaChuva("10:30", "11:10");
        // Bloco de chuva deve estar visível
        cy.contains("09:00").should("be.visible");
        cy.contains("11:10").should("be.visible");
        cy.get(`button#${TYPE.RAIN}`).should("have.attr", "data-badge", 1);
    });
});