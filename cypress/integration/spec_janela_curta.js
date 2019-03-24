describe("E2E: Teste com pequena janela de horários", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("recalcula os horários da manhã numa janela de 1 hora", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 11);

    // checa quantidade correta
    cy.dataCount({ n: 11, f: 0, r: 0 });

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da tarde
    cy.get("[data-cy=tarde-checkbox")
      .click()
      .should("not.be.checked");
    // desativa a aleatoriedade
    cy.get(`div.dock button#rand`).click();
    // altera os horários na configuração
    cy.get("[data-cy=manha-inicio").type("09:00");
    cy.get("[data-cy=manha-fim").type("10:00");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // primeira vistoria às 09h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("09:00");
    // vistorias a cada 6 minutos
    cy.get("tr[data-cy=linha-2] td[data-cy=hora]").contains("09:06");
    cy.get("tr[data-cy=linha-3] td[data-cy=hora]").contains("09:12");
    cy.get("tr[data-cy=linha-4] td[data-cy=hora]").contains("09:18");
    cy.get("tr[data-cy=linha-5] td[data-cy=hora]").contains("09:24");
    cy.get("tr[data-cy=linha-6] td[data-cy=hora]").contains("09:30");
    cy.get("tr[data-cy=linha-7] td[data-cy=hora]").contains("09:36");
    cy.get("tr[data-cy=linha-8] td[data-cy=hora]").contains("09:42");
    cy.get("tr[data-cy=linha-9] td[data-cy=hora]").contains("09:48");
    cy.get("tr[data-cy=linha-10] td[data-cy=hora]").contains("09:54");
    // última vistoria
    cy.get("tr[data-cy=linha-11] td[data-cy=hora]").contains("10:00");
  });

  it("recalcula os horários da tarde numa janela de 1 hora", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 11);

    // checa quantidade correta
    cy.dataCount({ n: 11, f: 0, r: 0 });

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da manha
    cy.get("[data-cy=manha-checkbox")
      .click()
      .should("not.be.checked");
    // desativa a aleatoriedade
    cy.get(`div.dock button#rand`).click();
    // altera os horários na configuração
    cy.get("[data-cy=tarde-inicio").type("15:00");
    cy.get("[data-cy=tarde-fim").type("16:00");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // primeira vistoria
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("15:00");
    // vistorias a cada 6 minutos
    cy.get("tr[data-cy=linha-2] td[data-cy=hora]").contains("15:06");
    cy.get("tr[data-cy=linha-3] td[data-cy=hora]").contains("15:12");
    cy.get("tr[data-cy=linha-4] td[data-cy=hora]").contains("15:18");
    cy.get("tr[data-cy=linha-5] td[data-cy=hora]").contains("15:24");
    cy.get("tr[data-cy=linha-6] td[data-cy=hora]").contains("15:30");
    cy.get("tr[data-cy=linha-7] td[data-cy=hora]").contains("15:36");
    cy.get("tr[data-cy=linha-8] td[data-cy=hora]").contains("15:42");
    cy.get("tr[data-cy=linha-9] td[data-cy=hora]").contains("15:48");
    cy.get("tr[data-cy=linha-10] td[data-cy=hora]").contains("15:54");
    // última vistoria
    cy.get("tr[data-cy=linha-11] td[data-cy=hora]").contains("16:00");
  });
});
