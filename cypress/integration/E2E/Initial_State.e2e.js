import { TEXT } from "../../../src/data/Data";

describe("E2E: Tela inicial, Configuração padrão", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Tem o título correto", () => {
        // Deve conter
        cy.contains(TEXT.CONTENT.TITLE);
        cy.contains(TEXT.CONTENT.SUBTITLE);
        cy.contains(TEXT.CONTENT.DESCRIPTION);

        // Não deve conter
        cy.menuOculto();
        cy.modalOculto();
    });

    it("Menu de configurações abre e fecha", () => {
        // Não deve conter
        cy.menuOculto();

        // Clica no botão de configuração para ativar o Menu.
        cy.get("button#" + TEXT.MENU).click();
        // Menu deve aparecer e exibir:
        cy.menuVisivel();

        // Clica novamente para fechar o Menu.
        cy.get("button#" + TEXT.MENU).click();
        // Não deve conter
        cy.menuOculto();

        // Testa duas vezes para garantir o funcionamento.
        // Clica no botão de configuração para ativar o Menu.
        cy.get("button#" + TEXT.MENU).click();
        // Menu deve aparecer e exibir:
        cy.menuVisivel();

        // Clica novamente para fechar o Menu.
        cy.get("button#" + TEXT.MENU).click();
        // Não deve conter
        cy.menuOculto();
    });
});

describe("E2E: Tela inicial, Adiciona Inspections", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Adiciona uma Vistoria Normal", () => {
        cy.adicionaInspections(TEXT.NORMAL, 1);
    });
});