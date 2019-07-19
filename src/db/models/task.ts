import { Model, Sequelize, DataTypes } from 'sequelize'

export default class Task extends Model {
  id!: number
  name: string;
  status: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  Task.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(500),
    status: DataTypes.INTEGER,
  }, {
    sequelize,
  })
}
