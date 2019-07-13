import { Sequelize, Model } from 'sequelize'
import { resolve, dirname } from 'path'
import { readdirSync } from 'fs'
import * as mkdirp from 'mkdirp'

import { SQLITE_FILE } from '../paths'
import operatorsAliases from './operatorsAlisases'

export default class DataBase {
  sequelize: Sequelize
  models: {
    [key: string]: typeof Model,
  } = {}

  static Sequelize = Sequelize

  static _instance: DataBase
  
  static instance(): DataBase {
    if (!this._instance) {
      this._instance = new DataBase()
    }
    return this._instance
  }

  constructor() {
    mkdirp.sync(dirname(SQLITE_FILE))
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: SQLITE_FILE,
      pool: {
        max: 5,
        min: 0,
      },
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        underscored: true, 
        freezeTableName: true,
      },
      operatorsAliases,
    }) 
    readdirSync(resolve(__dirname, './models/')).filter(
      file => (
        (file.indexOf('.') !== 0) 
        && (file !== 'index.js') && (file.slice(-3) === '.ts')
      )
    ).forEach((file) => {
      const model = this.sequelize.import(`./models/${file}`);
      this.models[model.name] = model
    });
  }
}

