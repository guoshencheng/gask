import DataBase from './db';
import { TaskStatusEnum } from './utils/constants'
import { TaskDTO } from './db/models/task'

const db = DataBase.instance()
const models = db.models;
const { Task } = models

export default class Gask {
  findTasks = async (): Promise<TaskDTO[]> => {
    const tasks = await Task.findAll()
    return tasks.map(t => t.toJSON() as TaskDTO)
  }
  createTask = async ({ name }: { name: string }): Promise<TaskDTO> => {
    const task = new Task({
      name,
      status: TaskStatusEnum.CREATED.value,
    })
    const result = await task.save()
    return result.toJSON() as TaskDTO
  }
  achiveTask = async (id: string): Promise<TaskDTO> => {
    const task = await Task.findOne({ where: { id } })
    if (!task) {
      throw new Error(`task with id ${id} not found`)
    }
    task.status = TaskStatusEnum.DONE.value
    await task.save()
    return task.toJSON() as TaskDTO
  }
}


(async () => {
  const g = new Gask()
  await db.connect()
  const result = await g.findTasks()
  console.log(result)
})()
