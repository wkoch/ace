import {
  timeObjAsStr,
  timeStrAsObj,
  getDuration,
  timeDiff,
  horarioEmMinutos,
  horaEntre,
  proximoHorario, atualizaIDs
} from "../../src/modules/helpers.js";

describe("Unit Test: Funções auxiliares", () => {
  context("timeObjAsStr", () => {
    it("Converte um objeto de hora para uma string de hora", () => {
      expect(timeObjAsStr({ h: 8, m: 40 })).to.eq("08:40");
      expect(timeObjAsStr({ h: 9, m: 0 })).to.eq("09:00");
      expect(timeObjAsStr({ h: 11, m: 59 })).to.eq("11:59");
    });
  });

  context("timeStringAsObj", () => {
    it("Converte uma string de hora para um objeto de hora", () => {
      expect(timeStrAsObj("08:40")).to.deep.equal({ h: 8, m: 40 });
      expect(timeStrAsObj("09:00")).to.deep.equal({ h: 9, m: 0 });
      expect(timeStrAsObj("11:59")).to.deep.equal({ h: 11, m: 59 });
    });
  });

  context("getDuration", () => {
    it("Retorna o tempo em minutos entre dois horários", () => {
      expect(getDuration("08:10", "08:20")).to.eq(10);
      expect(getDuration("09:00", "10:00")).to.eq(60);
      expect(getDuration("09:59", "10:00")).to.eq(1);
      expect(getDuration("10:00", "09:55")).to.eq(-5);
      expect(getDuration("10:00", "10:00")).to.eq(0);
    });
  });

  context("timeDiff", () => {
    it("Soma minutos a um horário", () => {
      expect(timeDiff("08:00", 35)).to.eq("08:35");
      expect(timeDiff("08:55", 10)).to.eq("09:05");
      expect(timeDiff("09:00", 95)).to.eq("10:35");
      expect(timeDiff("10:00", 120)).to.eq("12:00");
    });
  });

  context("horarioEmMinutos", () => {
    it("Retorna o total em minutos de um dado horário", () => {
      expect(horarioEmMinutos("12:00")).to.eq(720);
      expect(horarioEmMinutos("12:01")).to.eq(721);
      expect(horarioEmMinutos("13:00")).to.eq(780);
    });
  });

  context("horaEntre", () => {
    it("Checa se um horário está entre dois outros horários", () => {
      expect(horaEntre("12:00", "06:00", "18:00")).to.eq(true);
      expect(horaEntre("12:30", "12:00", "13:00")).to.eq(true);
      expect(horaEntre("12:01", "12:00", "13:00")).to.eq(true);
      expect(horaEntre("12:59", "12:00", "13:00")).to.eq(true);
      expect(horaEntre("11:30", "12:00", "13:00")).to.eq(false);
      expect(horaEntre("13:30", "12:00", "13:00")).to.eq(false);
    });
  });

  context("proximoHorario", () => {
    let lista1 = [
      {
        id: 1,
        tipo: "n",
        hora: "08:40",
        margem: 0
      }
    ];
    let lista2 = [
      {
        id: 1,
        tipo: "n",
        hora: "08:40",
        margem: 0
      },
      {
        id: 2,
        tipo: "f",
        hora: "08:55",
        margem: 0
      },
      {
        id: 3,
        tipo: "n",
        hora: "08:57",
        margem: 0
      }
    ];
    let lista3 = [
      {
        id: 1,
        tipo: "n",
        hora: "14:30",
        margem: 0
      }
    ];
    let manha1 = { ativado: true, inicio: "08:40", fim: "11:25" };
    let tarde1 = { ativado: true, inicio: "14:30", fim: "17:25" };
    let manha2 = { ativado: false, inicio: "08:40", fim: "11:25" };

    it("Calcula o próximo horário a ser usado", () => {
      expect(proximoHorario([], manha1, tarde1, 15)).to.eq("08:40");
      expect(proximoHorario([], manha2, tarde1, 15)).to.eq("14:30");
      expect(proximoHorario(lista1, manha1, tarde1, 15)).to.eq("08:55");
      expect(proximoHorario(lista1, manha1, tarde1, 20)).to.eq("09:00");
      expect(proximoHorario(lista2, manha1, tarde1, 15)).to.eq("09:12");
      expect(proximoHorario([], manha2, tarde1, 15)).to.eq("14:30");
      expect(proximoHorario(lista3, manha2, tarde1, 15)).to.eq("14:45");
    });
  });

  context("atualizaIDs", () => {
    it("Atualiza os IDs dos objetos conforme índice da lista", () => {
      expect(atualizaIDs([{id: 4}])).to.deep.eq([{id: 1}]);
      expect(atualizaIDs([{id: 2}, {id: 4}])).to.deep.eq([{id: 1}, {id: 2}]);
    });
  });
});
