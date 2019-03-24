describe("E2E: Tela inicial, config padrão", () => {
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

  it("checa a existência do divisor de páginas", () => {
    // adiciona 60 vistorias
    cy.visitas("normal", 130);

    // segundo título
    cy.get("tr")
      .eq(20)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(20)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(20)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(20)
      .contains("th", "Excluir");

    // terceiro título
    cy.get("tr")
      .eq(41)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(41)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(41)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(41)
      .contains("th", "Excluir");

    // quarto título
    cy.get("tr")
      .eq(62)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(62)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(62)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(62)
      .contains("th", "Excluir");

    // quinto título
    cy.get("tr")
      .eq(83)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(83)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(83)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(83)
      .contains("th", "Excluir");

    // ultimo título
    cy.get("tr")
      .eq(125)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(125)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(125)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(125)
      .contains("th", "Excluir");
  });
});
