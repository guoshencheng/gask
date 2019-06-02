import {
  create as storageCreate,
  update as storageUpdate,
  query as storageQuery,
  _drop as storageDrop,
  batchCreate as storageBatchCreate,
} from './storage'
import Condition, { Op, ConditionDescObj } from './condition'

const name = 'task'

export type TaskObj = {
  created?: string,
  name: string,
  group: string,
  _id?: string,
  checked?: number,
  achived?: number,
}

const DEFAULT_TASK_OBJ = {
  checked: 0,
  achived: 0,
}

export const batchCreate = async (tasks: TaskObj[]): Promise<TaskObj[]> => {
  const created = new Date().getTime()
  const result = await storageBatchCreate(name, (tasks || []).map(t => ({
    ...DEFAULT_TASK_OBJ,
    ...t,
    created,
  })))
  if (result.success) {
    return result.result
  }
  throw result.error
}

export const create = async (task: TaskObj): Promise<TaskObj> =>  {
  const created = new Date().getTime()
  const result = await storageCreate(name, {
    ...DEFAULT_TASK_OBJ,
    ...task,
    created,
  })
  if (result.success) {
    return result.result
  }
  throw result.error
}

export const updateByIds = async (ids: string[], patch: any): Promise<TaskObj[]> => {
  const result = await storageUpdate(name, {
    _id: {
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

export const list = async (condition?: ConditionDescObj | Condition): Promise<TaskObj[]> => {
  const result = await storageQuery(name, condition)
  if (result.success) {
    return result.result
  }
  throw result.error
}

export type ListGroup = {
  [key: string]: TaskObj[]
}

export const listByGroup = async (condition?: ConditionDescObj | Condition): Promise<ListGroup> => {
  const value = await list(condition)
  return value.reduce((pre, cur) => {
    const groupName = cur.group
    pre[groupName] = (pre[groupName] || []).concat(cur)
    return pre
  }, {} as ListGroup)
}

export const _drop = async (): Promise<void> => { await storageDrop(name) }
