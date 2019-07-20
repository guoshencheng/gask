export type EnumDesc = {
  [key: string]: string,
}

export type EnumObj<E> = {
  [key in keyof E]: {
    desc: string,
    value: string,
  }
}

export const $enum = (e: EnumDesc): EnumObj<typeof e> => {
  return Object.keys(e).reduce((pre: any, cur: string) => ({
    ...pre,
    [cur]: {
      desc: e[cur],
      value: cur,
    },
  }), {}) as EnumObj<typeof e>
}

export const TaskStatusEnum = $enum({
  CREATED: 'created',
  DOING: 'doing',
  DONE: 'done',
})

console.log(TaskStatusEnum)
