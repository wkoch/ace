import { TEXTO } from "../../src/data/Constantes";

// Comandos de teste do Menu de Configurações
Cypress.Commands.add("menuOculto", () => {
    cy.get(TEXTO.MANHÃ).should("not.be.visible");
    cy.get(TEXTO.TARDE).should("not.be.visible");
    cy.get(TEXTO.ENTRADA).should("not.be.visible");
    cy.get(TEXTO.SAÍDA).should("not.be.visible");
    cy.get(TEXTO.ALEATORIEDADE).should("not.be.visible");
    cy.get(TEXTO.BLOQUEIO).should("not.be.visible");
});

Cypress.Commands.add("menuVisivel", () => {
    cy.contains(TEXTO.MANHÃ);
    cy.contains(TEXTO.TARDE);
    cy.contains(TEXTO.ENTRADA);
    cy.contains(TEXTO.SAÍDA);
    cy.contains(TEXTO.ALEATORIEDADE);
    cy.contains(TEXTO.BLOQUEIO);
});


// Comandos de teste do Modal de registro de chuvas
Cypress.Commands.add("modalOculto", () => {
    cy.get(TEXTO.MODAL.TÍTULO).should("not.be.visible");
    cy.get("button#" + TEXTO.SALVAR).should("not.be.visible");
    cy.get("button#" + TEXTO.CANCELAR).should("not.be.visible");
});

Cypress.Commands.add("modalVisivel", () => {
    cy.contains(TEXTO.MODAL.TÍTULO);
    cy.contains(TEXTO.SALVAR);
    cy.contains(TEXTO.CANCELAR);
});


// Comandos de Adição de Vistorias
Cypress.Commands.add("adicionaVistorias", (tipo, quantia) => {
    for (let index = 0; index < quantia; index++) {
        cy.get(`button#${tipo}`).should("have.attr", "data-badge", index);
        cy.get(`button#${tipo}`).click();
        cy.get(`button#${tipo}`).should("have.attr", "data-badge", index + 1);
    }
});