import { ModelOp } from './helpers'

export class TopicModel {
  id?: string;
  title?: string;
  description?: string;
}

export type TopicDBOp = ModelOp<TopicModel>