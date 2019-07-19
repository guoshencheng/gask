import { Model, Sequelize, DataTypes } from 'sequelize'

export default class Group extends Model {
  id!: number
  name: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  Group.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(500),
  }, {
    sequelize,
  })
}

