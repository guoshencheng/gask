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


describe('combine filter', () => {
  const data = [{
    a: 21,
    b: 44,
  }, {
    a: 22,
    b: 33,
  }, {
    a: 23,
    b: 44,
  }, {
    a: 40,
    b: 44,
  }]
  it('combine with condition Obj', () => {
    const conditionObj = {
      a: {
        [Op.gte]: 21,
        [Op.lte]: 23
      },
      b: {
        [Op.eq]: 44
      }
    }
    const condition = new Condition(conditionObj)
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.b === 44 && i.a >= 21 && i.a <= 23))
  })

  it('combine with And Operation', () => {
    const condition = new Condition({
      b: {
        [Op.eq]: 44,
      }
    }).And(new Condition({
      a: {
        [Op.lte]: 23,
        [Op.gte]: 21,
      }
    }))
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => i.b === 44 && i.a >= 21 && i.a <= 23))
  })

  it('combine with Or Operation', () => {
    const condition = new Condition({
      b: {
        [Op.eq]: 44,
      }
    }).Or(new Condition({
      a: {
        [Op.gte]: 23,
        [Op.lte]: 24,
      }
    }))
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => (i.b === 44) || (i.a >= 23 && i.a <= 24)))
  })

  it('combine with Or and Add op', () => {
    const condition = new Condition({
      b: {
        [Op.eq]: 44,
      }
    }).Or(new Condition({
      a: {
        [Op.lte]: 24,
      }
    }).And({
      a: {
        [Op.gte]: 23,
      }
    }))
    const result = data.filter(condition.filter)
    expect(result).toEqual(data.filter(i => (i.b === 44) || (i.a >= 23 && i.a <= 24)))
  })
})
