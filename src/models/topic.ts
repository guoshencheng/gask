import { ModelOp } from './helpers'

export class TopicModel {
  workspaceId?: string;
  id: string;
  title?: string;
  description?: string;
}

export type TopicDBOp = ModelOp<TopicModel>