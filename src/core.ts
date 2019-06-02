import {
  create as storageCreate,
  update as storageUpdate,
  query as storageQuery,
} from './storage'
import { Op } from './condition'

const name = 'task'

export type TaskObj = {
  created?: string,
  name: string,
  group: string,
  id?: string,
  checked?: number,
  achived?: number,
}

const DEFAULT_TASK_OBJ = {
  checked: 0,
  achived: 0,
}

export const create = async (task: TaskObj): Promise<TaskObj> =>  {
  const result = await storageCreate(name, {
    ...DEFAULT_TASK_OBJ,
    ...task,
  })
  if (result.success) {
    return task
  }
  throw result.error
}

export const updateByIds = async (ids: string[], patch: any): Promise<TaskObj[]> => {
  const result = await storageUpdate(name, {
    id: {
      [Op.in]: ids
    }
  }, patch)
  if (result.success)  {
    return result.result as TaskObj[]
  }
  throw result.error
}

export const check = async (ids: string[]): Promise<TaskObj[]> => {
  return updateByIds(ids, {
    checked: 1,
  })
}

export const achive = async (ids: string[]): Promise<TaskObj[]> => {
  return updateByIds(ids, {
    achived: 1,
  })
}

export type ListOptions = {
  achived?: boolean,
  checked?: boolean,
}

export const list = async (options: ListOptions): Promise<TaskObj[]> => {
  const condition = {
    achived: options.achived ? 1 : 0,
    checked: options.checked ? 1 : 0,
  }
  const result = await storageQuery(name, condition)
  if (result.success) {
    return result.result
  }
  throw result.error
}

export type ListGroup = {
  [key: string]: TaskObj[]
}

export const listByGroup = async (options: ListOptions): Promise<ListGroup> => {
  const value = await list(options)
  return value.reduce((pre, cur) => {
    const groupName = cur.group
    pre[groupName] = (pre[groupName] || []).concat(cur)
    return pre
  }, {} as ListGroup)
}
