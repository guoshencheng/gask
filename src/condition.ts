export const gt: unique symbol = Symbol('gt')
export const lt: unique symbol = Symbol('lt')
export const gte: unique symbol = Symbol('gte')
export const lte: unique symbol = Symbol('lte')
export const like: unique symbol = Symbol('like')
export const ne: unique symbol = Symbol('ne')
export const eq: unique symbol = Symbol('eq')
export const or: unique symbol = Symbol('or')
export const _in: unique symbol = Symbol('in')


export const Op = {
  gt, lt, gte, lte, like, ne, eq, or, in: _in,
}

export type CompareBaseType = string | number | any[] | undefined | null

export type ConditionBaseDesc = {
  [gt]?: CompareBaseType,
  [lt]?: CompareBaseType,
  [gte]?: CompareBaseType,
  [lte]?: CompareBaseType,
  [like]?: CompareBaseType,
  [ne]?: CompareBaseType,
  [eq]?: CompareBaseType,
  [_in]?: CompareBaseType,
}

export type ConditionDescObj = {
  [key: string]: Condition | CompareBaseType | ConditionBaseDesc,
}

export type ConditionItem = {
  op: 'AND' | 'OR' | 'INIT',
  condition: ConditionDescObj | Condition,
}


export default class Condition {

  conditions: ConditionItem[] = []

  constructor(obj: ConditionDescObj) {
    this.conditions.push({
      op: 'INIT',
      condition: obj
    })
  }

  And(obj: ConditionDescObj | Condition): Condition {
    this.conditions.push({
      op: 'AND',
      condition: obj
    })
    return this
  }

  Or(obj: ConditionDescObj | Condition): Condition {
    this.conditions.push({
      op: 'OR',
      condition: obj
    })
    return this
  }

  queryByBaseCondition = (baseDesc: ConditionBaseDesc) => (item: any, index: number) => {
    const keys = Object.getOwnPropertySymbols(baseDesc)
    return keys.reduce((pre: boolean, cur: keyof ConditionBaseDesc) => {
      const ruleValue = baseDesc[cur]
      if (ruleValue) {
        switch(cur) {
          case gt:
            return pre && item > ruleValue
          case gte:
            return pre && item >= ruleValue
          case lt:
            return pre && item < ruleValue
          case lte:
            return pre && item <= ruleValue
          case ne:
            return pre && item !== ruleValue
          case like:
            return pre && new RegExp(`${ruleValue}`).test(`${item}`)
          case _in:
            return pre && (ruleValue as any[]).indexOf(item) > -1
          default:
            return pre && item === ruleValue
        }
      }
      return pre
    }, true)
  }

  toFilter = (condition: ConditionDescObj) => (item: any, index: number): boolean => {
    const keys = Object.keys(condition)
    return keys.reduce((pre, cur) => {
      const obj = condition[cur]
      if (obj instanceof Condition) {
        return pre && obj.filter(item[cur], index)
      } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        return pre && this.queryByBaseCondition(obj as ConditionBaseDesc)(item[cur], index)
      } else {
        return pre && item[cur] === obj
      }
    }, true)
  }

  filter = (item: any, index: number): boolean => {
    let result: boolean = true
    this.conditions.forEach(conditionItem => {
      const { op, condition } = conditionItem
      let curResult
      if (condition instanceof Condition) {
        curResult = condition.filter(item, index)
      } else {
        curResult = this.toFilter(condition)(item, index)
      }
      switch(op) {
        case 'AND':
          result = result && curResult
          break;
        case 'OR':
          result = result || curResult
          break;
        default:
          result = curResult
      }
    })
    return result
  }
}

