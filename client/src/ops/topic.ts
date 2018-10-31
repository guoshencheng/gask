import { Model, ModelT } from '../utils/file';
import { WorkSpaceT, choose as chooseWorkspace, save as saveWorkspace } from './workspace';
import { topic as renderTopic } from '../utils/render';

export class TopicT extends ModelT {
  title: string;
  workspace?: string;
}

const Topic = new Model<TopicT>('topics');

export const create = async ({ title }: TopicT, workspace?: WorkSpaceT) => {
  if (!workspace) {
    workspace = await chooseWorkspace();
  } else {
  }
  if (!workspace) return;
  const result = await Topic.create({
    title,
    workspace: workspace.hash as string,
  })
  workspace.topics = (workspace.topics || []).filter(i => i !== result.hash).concat(result.hash as string);
  await saveWorkspace(workspace)
  renderTopic(result, workspace);
}
