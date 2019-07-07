import sequelize, { Sequelize } from 'sequelize'

module.exports = (db: Sequelize) => {
  db.define('User', {
    name: sequelize.STRING,
    email: sequelize.STRING,
    token: sequelize.STRING,
    password: sequelize.STRING,
  })
}
