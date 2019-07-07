import sequelize, { Sequelize } from 'sequelize'

module.exports = (db: Sequelize) => {
  db.define('Task', {
    name: sequelize.STRING,
    group: sequelize.STRING,
  }, )
}
