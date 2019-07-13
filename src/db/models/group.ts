import { Sequelize, DataTypes } from 'sequelize'

module.exports = (db: Sequelize) => {
  const Group = db.define('Group', {
    name: DataTypes.STRING,
  })
  return Group
}


