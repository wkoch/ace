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
      .eq(21)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(21)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(21)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(21)
      .contains("th", "Excluir");

    // terceiro título
    cy.get("tr")
      .eq(42)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(42)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(42)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(42)
      .contains("th", "Excluir");

    // quarto título
    cy.get("tr")
      .eq(63)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(63)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(63)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(63)
      .contains("th", "Excluir");

    // quinto título
    cy.get("tr")
      .eq(84)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(84)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(84)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(84)
      .contains("th", "Excluir");

    // ultimo título
    cy.get("tr")
      .eq(105)
      .contains("th", "Linha");
    cy.get("tr")
      .eq(105)
      .contains("th", "Tipo");
    cy.get("tr")
      .eq(105)
      .contains("th", "Hora");
    cy.get("tr")
      .eq(105)
      .contains("th", "Excluir");
  });
});
