import { ModelOp } from './helpers'

export class TaskModel {
  id?: string;
  title?: string;
  topicId?: string;
  description?: string;
  creator?: string;
  assign?: string;
  status?: number;
}

export type TaskDBOp = ModelOp<TaskModel>