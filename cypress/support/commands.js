import { TEXT } from "../../src/data/Data";

// Comandos de teste do Menu de Configurações
Cypress.Commands.add("menuOculto", () => {
    cy.contains(TEXT.MORNING).should("not.be.visible");
    cy.contains(TEXT.AFTERNOON).should("not.be.visible");
    cy.contains(TEXT.ENTERED).should("not.be.visible");
    cy.contains(TEXT.EXITED).should("not.be.visible");
    cy.contains(TEXT.RANDOM).should("not.be.visible");
    cy.contains(TEXT.LOCK).should("not.be.visible");
});

Cypress.Commands.add("menuVisivel", () => {
    cy.contains(TEXT.MORNING).should("be.visible");
    cy.contains(TEXT.AFTERNOON).should("be.visible");
    cy.contains(TEXT.ENTERED).should("be.visible");
    cy.contains(TEXT.EXITED).should("be.visible");
    cy.contains(TEXT.RANDOM).should("be.visible");
    cy.contains(TEXT.LOCK).should("be.visible");
});


// Comandos de teste do Modal de registro de chuvas
Cypress.Commands.add("modalOculto", () => {
    cy.contains(TEXT.MODAL.TITLE).should("not.be.visible");
    cy.get("button#" + TEXT.SAVE).should("not.be.visible");
    cy.get("button#" + TEXT.CANCEL).should("not.be.visible");
});

Cypress.Commands.add("modalVisível", () => {
    cy.contains(TEXT.MODAL.TITLE).should("be.visible");
    cy.contains(TEXT.SAVE).should("be.visible");
    cy.contains(TEXT.CANCEL).should("be.visible");
});

Cypress.Commands.add("adicionaChuva", (start, end) => {
    // Abre Modal
    cy.get("button#" + TEXT.RAIN).click();
    // Digita horários
    cy.get("input#" + TEXT.START).type(start);
    cy.get("input#" + TEXT.END).type(end);
    // Salva
    cy.get("button#" + TEXT.SAVE).click();
});

// Comandos de Adição de Inspections
Cypress.Commands.add("adicionaInspections", (type, n) => {
    for (let index = 0; index < n; index++) {
        cy.get(`button#${type}`).should("have.attr", "data-badge", index);
        cy.get(`button#${type}`).click();
        cy.get(`button#${type}`).should("have.attr", "data-badge", index + 1);
    }
});