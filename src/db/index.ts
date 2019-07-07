const config = global.SERVERCONFIG;
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const db = {};
const mysql = config.mysql;
const operatorsAliases = require('./operatorsAliases.ts');

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  dialect: mysql.dialect,
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    underscored: true, // 将所有驼峰命名的属性名转换为下划线连接命名的表命，当有设置field选项时，取field的值
    freezeTableName: true,
  },
  operatorsAliases,
});
fs.readdirSync(path.resolve(__dirname, './models/')).filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')).forEach((file) => {
  const model = sequelize.import(`./models/${file}`);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

