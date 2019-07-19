import { Model, Sequelize, DataTypes } from 'sequelize'

export default class User extends Model {
  username: string;
  email: string;
  token: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  User.init({
    username: DataTypes.STRING(20),
    email: DataTypes.STRING(50),
    token: DataTypes.STRING(30)
  }, {
    sequelize,
  })
}

