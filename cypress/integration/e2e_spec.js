describe("E2E: Tela inicial vazia", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("tem o título da tabela correto", () => {
    cy.contains("th", "Linha");
    cy.contains("th", "Tipo");
    cy.contains("th", "Hora");
    cy.contains("th", "Excluir");
    cy.get("table td").should("not.exist");
  });

  it("adiciona, troca e remove uma vistoria normal", () => {
    cy.dataCount({ n: 0, f: 0, r: 0 });

    cy.visita("normal");
    cy.get("td.linha-1").contains(1);
    cy.get("td.tipo")
      .find("button")
      .should("have.class", "normal");
    cy.dataCount({ n: 1, f: 0, r: 0 });
    cy.get("td.hora").contains("08:");

    cy.get("button.normal").click();
    cy.get("td.tipo")
      .find("button")
      .should("have.class", "fechada");
    cy.dataCount({ n: 0, f: 1, r: 0 });

    cy.get("button.fechada").click();
    cy.get("td.tipo")
      .find("button")
      .should("have.class", "recuperada");
    cy.dataCount({ n: 0, f: 0, r: 1 });

    cy.get("button.recuperada").click();
    cy.get("td.tipo")
      .find("button")
      .should("have.class", "normal");
    cy.dataCount({ n: 1, f: 0, r: 0 });

    cy.get("td.excluir")
      .find("button")
      .click();
    cy.dataCount({ n: 0, f: 0, r: 0 });
  });

  it("adiciona várias vistorias", () => {
    cy.dataCount({ n: 0, f: 0, r: 0 });

    cy.visitas("normal", 5);
    cy.visita("recuperada");
    cy.visita("normal");
    cy.visita("fechada");
    cy.visita("recuperada");
    cy.visita("fechada");
    cy.visita("normal");
    cy.visita("fechada");
    cy.visita("fechada");
    cy.visitas("normal", 5);

    cy.dataCount({ n: 12, f: 4, r: 2 });
    cy.get("td.linha-18").contains(18);
  });
});
