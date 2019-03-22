import { timeObjAsStr, timeStrAsObj } from "../../src/modules/helpers.js";

describe("Unit Test: Funções auxiliares", function() {
  context("timeObjAsStr", function() {
    it("converte um objeto de hora para uma string de hora", function() {
      expect(timeObjAsStr({ h: 8, m: 40 })).to.eq("08:40");
      expect(timeObjAsStr({ h: 9, m: 0 })).to.eq("09:00");
      expect(timeObjAsStr({ h: 11, m: 59 })).to.eq("11:59");
    });

    //   it('can subtract numbers', function() {
    //     expect(subtract(5, 12)).to.eq(-7)
    //   })

    //   specify('can divide numbers', function() {
    //     expect(divide(27, 9)).to.eq(3)
    //   })

    //   specify('can multiply numbers', function() {
    //     expect(multiply(5, 4)).to.eq(20)
    //   })
  });

  context("timeStringAsObj", function() {
    it("converte uma string de hora para um objeto de hora", function() {
      expect(timeStrAsObj("08:40")).to.deep.equal({h: 8, m: 40});
      expect(timeStrAsObj("09:00")).to.deep.equal({h: 9, m: 0});
      expect(timeStrAsObj("11:59")).to.deep.equal({h: 11, m: 59});
    })
  })
});
