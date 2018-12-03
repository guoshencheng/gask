import { TaskDBOp, TaskModel } from './task';
import { TopicDBOp, TopicModel } from './topic';
import { UserDBOp, UserModel } from './user';
import { WorkspaceDBOp, WorkspaceModel } from './workspace';
import { ConfigDBOp, ConfigModel } from './config';
import { PageOptions } from './helpers';

export type DBOps = {
  task: TaskDBOp,
  topic: TopicDBOp,
  user: UserDBOp,
  workspace: WorkspaceDBOp,
  config: ConfigDBOp,
}

export interface AppOptions {
  isLocal: boolean
}

export class TopicDetail extends TopicModel {
  tasks: TaskModel[]
}
export class WorkspaceDetail extends WorkspaceModel {
  topics: TopicDetail[]
}

class App {
  options: AppOptions
  dbops: DBOps
  getCurrentConfigPromise: Promise<ConfigModel>
  getCurrentUserPromise: Promise<UserModel>
  constructor(dbops: DBOps, appOptions: AppOptions) {
    this.dbops = dbops;
    this.options = appOptions;
    if (appOptions.isLocal) {
      this.getCurrentConfigPromise = (() => this.dbops.config.find())();
      this.getCurrentUserPromise = (async () => {
        const data = await this.getCurrentConfigPromise;
        const userId = data.currentUserId;
        return this.dbops.user.findById(userId);
      })()
    }
  }

  async currentUser(): Promise<UserModel | undefined> {
    if (this.options.isLocal) {
      return await this.getCurrentUserPromise;
    }
  }

  async createWorspace(workspace: WorkspaceModel, owner: UserModel): Promise<WorkspaceModel> {
    workspace.ownerId = owner.id;
    return this.dbops.workspace.create(workspace);
  }

  async workspaces(page: PageOptions): Promise<WorkspaceModel[]> {
    return this.dbops.workspace.findAll(page);
  }

  async findWorkspaceById(workspaceId: string): Promise<WorkspaceModel> {
    return this.dbops.workspace.findById(workspaceId);
  }

  async findTopicsByWorkspaceId(workspaceId: string, page?: PageOptions): Promise<TopicModel[]> {
    const $page = page || { where: {} };
    return this.dbops.topic.findAll({
      ...$page,
      where: {
        ...$page.where,
        workspaceId,
      }
    })
  }

  async findTasksByTopicIds(topicIds: string[], page?: PageOptions): Promise<TaskModel[]> {
    const $page = page || { where: {} };
    return this.dbops.task.findAll({
      ...$page,
      where: {
        ...$page.where,
        taskId: topicIds
      }
    })
  }

  async workspaceDetail(workspaceId: string): Promise<WorkspaceDetail> {
    const workspace = await this.findWorkspaceById(workspaceId);
    const topics = await this.findTopicsByWorkspaceId(workspaceId);
    const tasks = await this.findTasksByTopicIds(topics.map(t => t.id));
    return {
      ...workspace,
      topics: topics.map(t => ({ ...t, tasks: tasks.filter(i => i.topicId === t.id) }))
    }
  }
}

export default App;