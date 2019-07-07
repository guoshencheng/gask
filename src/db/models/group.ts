import sequelize, { Sequelize } from 'sequelize'

module.exports = (db: Sequelize) => {
  db.define('Group', {
    name: sequelize.STRING,
  })
}


