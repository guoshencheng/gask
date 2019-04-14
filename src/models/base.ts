export const DataTypes = {
  String: 'string',
  Date: 'date',
  Number: 'number',
}

export type PropType = 'string' | 'date' | 'number' | string

export type ModelConfig = {
  name: string,
  props: {
    [key: string]: PropType | {
      type?: PropType,
      getter?: () => any,
      setter?: (value: any) => void,
      validate?: (value: any) => boolean,
    }
  }
}

const getterForType = (type: string) => {
  switch (type) {
    case DataTypes.Number:
      return function() { return Number(this.value) }
    case DataTypes.Date:
      return function() { return new Date(this.value) }
    default:
      return function() { return this.value }
  }
}

const setterForType = (type: string) => {
  switch (type) {
    case DataTypes.Number:
      return function(value: number) { this.value = `${value}` }
    case DataTypes.Date:
      return function(value: Date) { this.value = `${value.getTime()}` }
    default:
      return function(value: any) { this.value = value }
  }
}


export type SingleArgsFunc = (arg: any) => any

function callFns(fns: SingleArgsFunc[], v: any) {
  let val = v
  fns.forEach((fn: (value: any) => any) => {
    val = fn.call(this, val)
  })
  return val
}

export default (config: ModelConfig) => {
  const { props } = config
  const propKeys = Object.keys(props)
  
  function Model() {}
  
  Model.$name = config.name

  Model.prototype.toJSON = function(): any {
  }
  Model.prototype.toString = function() {
  }
  Model.prototype.save = function(): void {
  }
  propKeys.forEach(key => {
    let prop = props[key]
    const getter = [] as SingleArgsFunc[]
    const setter = [] as SingleArgsFunc[]
    if (typeof prop === 'string') {
      prop = {
        type: prop,
      }
    }
    getter.push(getterForType(prop.type as string))
    setter.push(setterForType(prop.type as string))
    if (prop.getter) {
      getter.push(prop.getter)
    }
    if (prop.setter) {
      setter.push(prop.setter)
    }
    Object.defineProperty(Model, key, {
      get() {
        callFns.call(this, getter)
      },
      set(v: any) {
        callFns.call(this, setter, v)
      },
    })
  })
  return Model
}
