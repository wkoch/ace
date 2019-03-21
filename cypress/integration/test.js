import * as helpers from '../../src/lib/helpers.js';

describe('Unit test index functions', function() {
    context('timeObjAsStr', function() {
      it('converts a time object to a time string', function() {
        expect(helpers.timeObjAsStr({h: 8, m: 40})).to.eq("08:40")
      })
  
    //   it('can subtract numbers', function() {
    //     expect(subtract(5, 12)).to.eq(-7)
    //   })
  
    //   specify('can divide numbers', function() {
    //     expect(divide(27, 9)).to.eq(3)
    //   })
  
    //   specify('can multiply numbers', function() {
    //     expect(multiply(5, 4)).to.eq(20)
    //   })
    })
  });