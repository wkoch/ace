describe("E2E: Teste com pequena janela de horários", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("recalcula os horários da manhã numa janela de 5 horas", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 21);

    // checa quantidade correta
    cy.dataCount({ n: 21, f: 0, r: 0 });

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da tarde
    cy.get("[data-cy=tarde-checkbox")
      .click()
      .should("not.be.checked");
    // desativa a aleatoriedade
    cy.get(`div.dock button#rand`).click();
    // altera os horários na configuração
    cy.get("[data-cy=manha-inicio").type("08:00");
    cy.get("[data-cy=manha-fim").type("13:00");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // checa as vistorias
    cy.checaGrupo("09", ["00", "15", "30", "45"]);
    cy.checaGrupo("10", ["00", "15", "30", "45"]);
    cy.checaGrupo("11", ["00", "15", "30", "45"]);
    cy.checaGrupo("12", ["00", "15", "30", "45"]);
    // última vistoria
    cy.get("tr td[data-cy=hora]").last().contains("13:00");
  });

  it("recalcula os horários da tarde numa janela de 8 horas", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 31);

    // checa quantidade correta
    cy.dataCount({ n: 31, f: 0, r: 0 });

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da tarde
    cy.get("[data-cy=tarde-checkbox")
      .click()
      .should("not.be.checked");
    // desativa a aleatoriedade
    cy.get(`div.dock button#rand`).click();
    // altera os horários na configuração
    cy.get("[data-cy=manha-inicio").type("08:00");
    cy.get("[data-cy=manha-fim").type("16:00");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // checa as vistorias
    cy.checaGrupo("08", ["00", "16", "32", "48"]);
    cy.checaGrupo("09", ["04", "20", "36", "52"]);
    cy.checaGrupo("10", ["08", "24", "40", "56"]);
    cy.checaGrupo("11", [      "12", "28", "44"]);
    cy.checaGrupo("12", ["00", "16", "32", "48"]);
    cy.checaGrupo("13", ["04", "20", "36", "52"]);
    cy.checaGrupo("14", ["08", "24", "40", "56"]);
    cy.checaGrupo("15", [      "12", "28", "44"]);
    // última vistoria
    cy.get("tr td[data-cy=hora]").last().contains("16:00");
  });
});
