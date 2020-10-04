import { TEXTO } from "../../src/data/Constantes";

// Comandos de teste do Menu de Configurações
Cypress.Commands.add("menuOculto", () => {
    cy.contains(TEXTO.MANHÃ).should("not.be.visible");
    cy.contains(TEXTO.TARDE).should("not.be.visible");
    cy.contains(TEXTO.ENTRADA).should("not.be.visible");
    cy.contains(TEXTO.SAÍDA).should("not.be.visible");
    cy.contains(TEXTO.ALEATORIEDADE).should("not.be.visible");
    cy.contains(TEXTO.BLOQUEIO).should("not.be.visible");
});

Cypress.Commands.add("menuVisivel", () => {
    cy.contains(TEXTO.MANHÃ).should("be.visible");
    cy.contains(TEXTO.TARDE).should("be.visible");
    cy.contains(TEXTO.ENTRADA).should("be.visible");
    cy.contains(TEXTO.SAÍDA).should("be.visible");
    cy.contains(TEXTO.ALEATORIEDADE).should("be.visible");
    cy.contains(TEXTO.BLOQUEIO).should("be.visible");
});


// Comandos de teste do Modal de registro de chuvas
Cypress.Commands.add("modalOculto", () => {
    cy.contains(TEXTO.MODAL.TÍTULO).should("not.be.visible");
    cy.get("button#" + TEXTO.SALVAR).should("not.be.visible");
    cy.get("button#" + TEXTO.CANCELAR).should("not.be.visible");
});

Cypress.Commands.add("modalVisível", () => {
    cy.contains(TEXTO.MODAL.TÍTULO).should("be.visible");
    cy.contains(TEXTO.SALVAR).should("be.visible");
    cy.contains(TEXTO.CANCELAR).should("be.visible");
});

Cypress.Commands.add("adicionaChuva", (início, fim) => {
    // Abre Modal
    cy.get("button#" + TEXTO.CHUVA).click();
    // Digita horários
    cy.get("input#" + TEXTO.INÍCIO).type(início);
    cy.get("input#" + TEXTO.FIM).type(fim);
    // Salva
    cy.get("button#" + TEXTO.SALVAR).click();
});

// Comandos de Adição de Vistorias
Cypress.Commands.add("adicionaVistorias", (tipo, quantia) => {
    for (let index = 0; index < quantia; index++) {
        cy.get(`button#${tipo}`).should("have.attr", "data-badge", index);
        cy.get(`button#${tipo}`).click();
        cy.get(`button#${tipo}`).should("have.attr", "data-badge", index + 1);
    }
});