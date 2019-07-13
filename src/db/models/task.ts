import { Sequelize, DataTypes } from 'sequelize'

module.exports = (db: Sequelize) => {
  const Task = db.define('Task', {
    name: DataTypes.STRING,
    group: DataTypes.STRING,
  })
  return Task
}
