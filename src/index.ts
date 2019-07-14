import DataBase from './db'
import { Model } from 'sequelize'

const { Group, Task } = DataBase.instance().models

export class Gask {
  async createGroup({
    name,
  }: {
    name: string,
  }): Promise<Model> {
    const result = await Group.create({
      name,
    })
    return result
  }

  remoteGroup(id: string): Promise<any> {
    const result = 
  }

  renameGroup() {
  }

  createTask() {
  }

  doingTask() {
  }

  achiveTask() {
  }
}
