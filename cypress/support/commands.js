// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("visita", tipo => {
  cy.get(`div.dock button#${tipo}`).click();
});

Cypress.Commands.add("visitas", (tipo, quantia) => {
  for (let index = 0; index < quantia; index++) {
    cy.get(`div.dock button#${tipo}`).click();
  }
});

// Cypress.Commands.add("dataCount", (tipo, valor) => {
//     cy.get(`div.dock button#${tipo}`).should("have.class", `data-${valor}`);
// });

Cypress.Commands.add("dataCount", (data) => {
    cy.get("div.dock button#normal").should("have.class", `data-${data.n}`);
    cy.get("div.dock button#fechada").should("have.class", `data-${data.f}`);
    cy.get("div.dock button#recuperada").should("have.class", `data-${data.r}`);
});

Cypress.Commands.add("visitasChecadas", (tipo, quantia, hora) => {
  for (let index = 0; index < quantia; index++) {
    cy.get(`div.dock button#${tipo}`).click();
    cy.get("tr").last().get("td[data-cy=hora]").contains(`${hora}:`);
  }
});