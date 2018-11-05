import { Model, ModelT } from '../utils/file';
import {
  save as saveWorkspace,
  current as currentWorkspace,
} from './workspace';
import { topic as renderTopic } from '../utils/render';

export class TopicT extends ModelT {
  title: string;
  workspace?: string;
}

const Topic = new Model<TopicT>('topics');

export const list = async () => {
  const workspace = await currentWorkspace();
  if (!workspace) return;
  const hashs = workspace.topics || [];
  const topics = await Topic.findByHashs(hashs);
  console.log(topics);
}

export const create = async ({ title }: TopicT) => {
  const workspace = await currentWorkspace();
  if (!workspace) return;
  const result = await Topic.create({
    title,
    workspace: workspace.hash as string,
  })
  workspace.topics = (workspace.topics || []).filter(i => i !== result.hash).concat(result.hash as string);
  await saveWorkspace(workspace)
  renderTopic(result, workspace);
}
