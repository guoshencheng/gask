import {
  create as storageCreate,
  query as storageQuery,
} from './storage'

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

export const check = async (ids: string[]): Promise<TaskObj[]> => {
  // const tasks =  
}
