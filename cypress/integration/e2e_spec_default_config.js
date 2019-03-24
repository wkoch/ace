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

  it("adiciona, troca e remove uma vistoria normal", () => {
    // Tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    cy.horaPrecisa();

    // adiciona 1 e checa tudo
    cy.visita("normal");
    cy.get("td[data-cy=linha-1]").contains(1);
    cy.get("td[data-cy=tipo]")
      .find("button")
      .should("have.attr", "data-cy")
      .and("include", "normal");
    cy.dataCount({ n: 1, f: 0, r: 0 });
    cy.get("td[data-cy=hora]").contains("08:40");

    // troca para fechada e checa
    cy.get("button[data-cy=normal]").click();
    cy.get("td[data-cy=tipo]")
      .find("button")
      .should("have.attr", "data-cy")
      .and("include", "fechada");
    cy.dataCount({ n: 0, f: 1, r: 0 });

    // troca para recuperada e checa
    cy.get("button[data-cy=fechada]").click();
    cy.get("td[data-cy=tipo]")
      .find("button")
      .should("have.attr", "data-cy")
      .and("include", "recuperada");
    cy.dataCount({ n: 0, f: 0, r: 1 });

    // troca para normal novamente e checa
    cy.get("button[data-cy=recuperada]").click();
    cy.get("td[data-cy=tipo]")
      .find("button")
      .should("have.attr", "data-cy")
      .and("include", "normal");
    cy.dataCount({ n: 1, f: 0, r: 0 });

    // exclui a linha
    cy.get("td[data-cy=excluir]")
      .find("button")
      .click();

    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });
  });

  it("adiciona várias vistorias", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiciona várias vistorias
    cy.visitas("normal", 5);
    cy.visita("recuperada");
    cy.visita("normal");
    cy.visita("fechada");
    cy.visita("recuperada");
    cy.visita("recuperada");
    cy.visita("fechada");
    cy.visita("normal");
    cy.visita("fechada");
    cy.visita("fechada");
    cy.visitas("normal", 10);

    cy.horaPrecisa();

    // checa tudo
    cy.dataCount({ n: 17, f: 4, r: 3 });
    cy.get("tr")
      .eq(1)
      .contains("td", 1);
    cy.get("tr")
      .eq(10)
      .contains(10);
    cy.get("tr")
      .eq(21)
      .contains(20);
    cy.get("tr")
      .eq(25)
      .contains(24);

    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:40");
    cy.get("tr[data-cy=linha-10] td[data-cy=hora]").contains("17:15");
    cy.get("tr[data-cy=linha-18] td[data-cy=hora]").contains("11:10");
    cy.get("tr[data-cy=linha-18] td[data-cy=hora]").contains("14:30");
    cy.get("tr[data-cy=linha-24] td[data-cy=hora]").contains("16:06");
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

  it("checa o horário de um dia cheio", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 5);
    cy.visitas("fechada", 2);
    cy.visitas("normal", 5);
    cy.visita("fechada");
    cy.visitas("normal", 5);
    cy.visitas("fechada", 2);
    cy.visitas("normal", 5);

    // checa quantidade correta
    cy.dataCount({ n: 20, f: 5, r: 0 });

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-12] td[data-cy=hora]").contains("11:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-13] td[data-cy=hora]").contains("14:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");
  });

  it("checa o horário final de 10 a 30 vistorias", () => {
    // adiociona 10 vistorias normais
    cy.visitas("normal", 10);
    cy.visitasChecadas("normal", 20, "17");
  });

  it("checa o horário final de 10 a 30 vistorias com fechadas", () => {
    cy.visitas("normal", 5);
    cy.visitas("fechada", 2);
    cy.visitas("normal", 5);
    cy.visitasChecadas("normal", 3, "17");
    cy.visitasChecadas("fechada", 2, "17");
    cy.visitasChecadas("normal", 2, "17");
    cy.visitasChecadas("fechada", 2, "17");
    cy.visitasChecadas("normal", 5, "17");
    cy.visitasChecadas("fechada", 2, "17");
    cy.visitasChecadas("normal", 5, "17");
    cy.visitasChecadas("fechada", 2, "17");
    cy.visitasChecadas("normal", 5, "17");
    cy.visitasChecadas("fechada", 2, "17");
  });
});
