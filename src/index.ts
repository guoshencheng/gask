import DataBase from './db'

const instance = DataBase.instance()


const User = instance.models.User 
User.sync().then(() => {
  console.log(1212)
})
console.log(instance.models)
