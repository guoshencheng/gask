import Condition, { Op } from '../src/condition'

describe('condition to filter', () => {
  it('condition to filter', () => {
    const conditionObj = {
      a: {
        [Op.gt]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const data = [{
      a: 21,
    }, {
      a: 22,
    }, {
      a: 233,
    }, {
      a: 40,
    }]
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a > 22))
  })
})
