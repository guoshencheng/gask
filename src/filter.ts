export const gt: unique symbol = Symbol('gt')
export const lt: unique symbol = Symbol('lt')
export const gte: unique symbol = Symbol('gte')
export const lte: unique symbol = Symbol('lte')
export const like: unique symbol = Symbol('like')
export const ne: unique symbol = Symbol('ne')
export const eq: unique symbol = Symbol('eq')
export const or: unique symbol = Symbol('or')


export const Op = {
  gt, lt, gte, lte, like, ne, eq, or,
}

export type CompareBaseType = string | number | undefined | null


// object => condition 
// { a: 13 } => 
/**
 * A.And().Or()
 */


export class Condition {

  conditions: ConditionItem[]

  constructor(obj: ConditionDescObj) {
    this.conditions.push({
      op: 'INIT',
      condition: obj
    })
  }

  And(obj: ConditionDescObj | Condition): void {
    this.conditions.push({
      op: 'AND',
      condition: obj
    })
  }

  Or(obj: ConditionDescObj | Condition): void {
    this.conditions.push({
      op: 'OR',
      condition: obj
    })
  }

  toFilter = (condition: ConditionDescObj) => (item: any, index: number): boolean => {
    
  }

  filter(item: any, index: number): boolean {
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

export type ConditionDescObj = {
  [key: string]: CompareBaseType | {
    [gt]?: CompareBaseType,
    [lt]?: CompareBaseType,
    [gte]?: CompareBaseType,
    [lte]?: CompareBaseType,
    [like]?: CompareBaseType,
    [ne]?: CompareBaseType,
    [eq]?: CompareBaseType,
  },
}

export type ConditionItem = {
  op: 'AND' | 'OR' | 'INIT',
  condition: ConditionDescObj | Condition,
}

export type WhereType = {
  [key: string]: CompareBaseType,
  [or]?: WhereType,
}

const filter = (where?: WhereType) =>  {
  where = where || {}
  const keys = Object.keys(where) as (string | symbol)[]
  let filterFunc
  if (keys.indexOf(or) > -1 && !!where[or]) {
    filterFunc = filter(where[or])
  }
  return (item) =>  {
    
  }
}
