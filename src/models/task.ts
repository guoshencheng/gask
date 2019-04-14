import ModelFactory, { DataTypes } from './base'

const TaskModel = ModelFactory({
  name: 'task',
  props: {
    group: DataTypes.String,
    name: DataTypes.String,
    content: DataTypes.String,
    status: DataTypes.Number,
    created: DataTypes.Date,
  }
})

export default TaskModel
