describe("E2E: Alteração de configurações", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("recalcula os horários da manhã quando não há período da tarde", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais e 5 fechadas
    cy.visitas("normal", 25);

    // checa quantidade correta
    cy.dataCount({ n: 25, f: 0, r: 0 });

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-12] td[data-cy=hora]").contains("11:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-13] td[data-cy=hora]").contains("14:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da tarde
    cy.get("[data-cy=tarde-checkbox")
      .click()
      .should("not.be.checked");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // checa novos horários, todos durante a manhã
    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // última vistoria às 11h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("11:");
  });

  it("recalcula os horários da tarde quando não há período da manhã", () => {
    // tudo zerado
    cy.dataCount({ n: 0, f: 0, r: 0 });

    // adiociona 20 vistorias normais
    cy.visitas("normal", 25);

    // checa quantidade correta
    cy.dataCount({ n: 25, f: 0, r: 0 });

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-12] td[data-cy=hora]").contains("11:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-13] td[data-cy=hora]").contains("14:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa o período da manha
    cy.get("[data-cy=manha-checkbox")
      .click()
      .should("not.be.checked");
    // fecha painel config
    cy.get(`div.dock button#config`).click();

    // checa novos horários, todos durante a tarde
    // primeira vistoria às 14h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("14:");
    // última vistoria às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");
  });

  it("mostra um erro quando nenhum período é selecionado", () => {
    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // mensagem de erro não existe
    cy.get("p[data-cy=erro]").should("not.exist");
    // desativa o período da manha
    cy.get("[data-cy=manha-checkbox")
      .click()
      .should("not.be.checked");
    // mensagem de erro ainda não existe
    cy.get("p[data-cy=erro]").should("not.exist");
    // desativa o período da tarde
    cy.get("[data-cy=tarde-checkbox")
      .click()
      .should("not.be.checked");
    // ERRO aparece na tela
    cy.get("p[data-cy=erro]")
      .should("exist")
      .and("be.visible");
    // reativa o período da manha
    cy.get("[data-cy=manha-checkbox")
      .click()
      .should("be.checked");
    // mensagem de erro não existe mais
    cy.get("p[data-cy=erro]").should("not.exist");
  });

  it("recalcula os horários quando são alterados nas configurações", () => {
    // adiociona 20 vistorias normais
    cy.visitas("normal", 25);

    // abre painel de config
    cy.get(`div.dock button#config`).click();

    // altera os horários na configuração
    cy.get("[data-cy=manha-inicio").type("06:20");
    cy.get("[data-cy=manha-fim").type("12:40");
    cy.get("[data-cy=tarde-inicio").type("15:20");
    cy.get("[data-cy=tarde-fim").type("18:40");

    // fecha painel de config
    cy.get(`div.dock button#config`).click();

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("06:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-16] td[data-cy=hora]").contains("12:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-17] td[data-cy=hora]").contains("15:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("18:");
  });

  it("botão travar evita todo tipo de alterações", () => {
    // adiociona 20 vistorias normais
    cy.visitas("normal", 25);

    // checa quantidade correta
    cy.dataCount({ n: 25, f: 0, r: 0 });

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-12] td[data-cy=hora]").contains("11:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-13] td[data-cy=hora]").contains("14:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");
    

    // abre painel de config
    cy.get(`div.dock button#config`).click();

    // ativa a trava de alterações
    cy.get(`div.dock button#travar`).click();

    // faz alterações
    // altera os horários na configuração
    cy.get("[data-cy=manha-inicio").type("06:20");
    cy.get("[data-cy=manha-fim").type("12:40");
    cy.get("[data-cy=tarde-inicio").type("15:20");
    cy.get("[data-cy=tarde-fim").type("18:40");

    // fecha painel de config
    cy.get(`div.dock button#config`).click();


    // checa que nada mudou
    cy.dataCount({ n: 25, f: 0, r: 0 });

    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("08:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-12] td[data-cy=hora]").contains("11:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-13] td[data-cy=hora]").contains("14:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("17:");

    // abre painel de config
    cy.get(`div.dock button#config`).click();
    // desativa a trava de alterações
    cy.get(`div.dock button#destravar`).click();
    // fecha painel de config
    cy.get(`div.dock button#config`).click();

    // agora as mudanças foram aplicadas
    // primeira vistoria às 08h
    cy.get("tr[data-cy=linha-1] td[data-cy=hora]").contains("06:");
    // fim da manhã às 11h
    cy.get("tr[data-cy=linha-16] td[data-cy=hora]").contains("12:");
    // início da tarde às 14h
    cy.get("tr[data-cy=linha-17] td[data-cy=hora]").contains("15:");
    // fim da tarde às 17h
    cy.get("tr[data-cy=linha-25] td[data-cy=hora]").contains("18:");
  })
});
