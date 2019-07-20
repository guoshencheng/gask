import { Model, Sequelize, DataTypes } from 'sequelize'
import * as shortId from 'shortid'

export type TaskDTO = {
  id: string,
  name: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
}

export default class Task extends Model {
  id: string;
  name: string;
  status: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  Task.init({
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      defaultValue: shortId.generate,
    },
    name: DataTypes.STRING(500),
    status: DataTypes.INTEGER,
  }, {
    tableName: 'tasks',
    sequelize,
  })
}
