import Condition, { Op } from '../src/condition'

describe('condition to filter', () => {
  const data = [{
    a: 21,
  }, {
    a: 22,
  }, {
    a: 233,
  }, {
    a: 40,
  }]
  it('condition to filter Op.gt', () => {
    const conditionObj = {
      a: {
        [Op.gt]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a > 22))
  })
  it('condition to filter Op.eq', () => {
    const conditionObj = {
      a: {
        [Op.eq]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a === 22))
  })
  it('condition to filter Op.ne', () => {
    const conditionObj = {
      a: {
        [Op.ne]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a !== 22))
  })

  it('condition to filter Op.lt', () => {
    const conditionObj = {
      a: {
        [Op.lt]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a < 22))
  })

  it('condition to filter Op.lte', () => {
    const conditionObj = {
      a: {
        [Op.lte]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a <= 22))
  })
  it('condition to filter Op.gte', () => {
    const conditionObj = {
      a: {
        [Op.gte]: 22
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.a >= 22))
  })
  it('condition to filter Op.like', () => {
    const conditionObj = {
      a: {
        [Op.like]: 33
      },
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => /33/.test(`${i.a}`)))
  })
})
