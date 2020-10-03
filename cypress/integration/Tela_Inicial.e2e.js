import { TEXTO } from "../../src/data/Constantes";

describe("E2E: Tela inicial, Configuração padrão", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Tem o título correto", () => {
        // Deve conter
        cy.contains("h1", TEXTO.CONTEÚDO.TÍTULO);
        cy.contains("h2", TEXTO.CONTEÚDO.SUBTÍTULO);
        cy.contains("p", TEXTO.CONTEÚDO.DESCRIÇÃO);

        // Não deve conter
        cy.menuOculto();
        cy.modalOculto();
    });

    it("Menu de configurações abre e fecha", () => {
        // Não deve conter
        cy.menuOculto();

        // Clica no botão de configuração para ativar o Menu.
        cy.get("button#" + TEXTO.MENU).click();
        // Menu deve aparecer e exibir:
        cy.menuVisivel();

        // Clica novamente para fechar o Menu.
        cy.get("button#" + TEXTO.MENU).click();
        // Não deve conter
        cy.menuOculto();

        // Testa duas vezes para garantir o funcionamento.
        // Clica no botão de configuração para ativar o Menu.
        cy.get("button#" + TEXTO.MENU).click();
        // Menu deve aparecer e exibir:
        cy.menuVisivel();

        // Clica novamente para fechar o Menu.
        cy.get("button#" + TEXTO.MENU).click();
        // Não deve conter
        cy.menuOculto();
    });

    it("Botão de chuva abre um Modal", () => {
        // Modal oculto
        cy.modalOculto();

        // Clica no botão adicionar chuva para ativar o Modal.
        cy.get("button#" + TEXTO.CHUVA).click();
        // Modal aparece
        cy.modalVisivel();

        // Fecha modal no X
        cy.get("button#" + TEXTO.FECHAR).click();
        // Modal oculto
        cy.modalOculto();

        // Clica no botão adicionar chuva para ativar o Modal.
        cy.get("button#" + TEXTO.CHUVA).click();
        // Modal aparece
        cy.modalVisivel();

        // Fecha modal no Cancelar
        cy.get("button#" + TEXTO.CANCELAR).click();
        // Modal oculto
        cy.modalOculto();
    });
});

describe("E2E: Tela inicial, Adiciona Vistorias", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Adiciona uma Vistoria Normal", () => {
        // cy.get("button#" + TEXTO.NORMAL).should("have.attr", "data-badge", 0);
        // cy.get("button#" + TEXTO.NORMAL).click();
        // cy.get("button#" + TEXTO.NORMAL).should("have.attr", "data-badge", 1);
        cy.adicionaVistorias(TEXTO.NORMAL, 5);
    });
});