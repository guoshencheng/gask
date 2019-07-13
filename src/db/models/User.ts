import { Sequelize, DataTypes } from 'sequelize'

module.exports = (db: Sequelize ) => {
  const User = db.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  return User
}
