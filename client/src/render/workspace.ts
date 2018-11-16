import * as blessed from 'blessed';
import { UserT } from '../ops/user';
import { topic } from '../utils/render';

const user = {
  username: 'user',
  email: 'email',
}

const data: WorkSpaceDO = {
  title: '12121',
  topics: [{
    title: 'test1',
    tasks: [{
      title: 'title1',
      description: 'desc1',
      creator: user,
      assign: user,
      status: 1
    }]
  }]
}

export class TaskDO {
  title: string
  description: string
  creator: UserT
  assign: UserT
  status: number
}

export class TopicDO {
  title: string;
  tasks: TaskDO[];
}

export class WorkSpaceDO {
  title: string;
  topics: TopicDO[]
}

export default class WorkSpace {
  parent: blessed.Widgets.BlessedElement
  topicBlocks: blessed.Widgets.BoxElement[]
  taskBlocks: {
    [key: string]: blessed.Widgets.BoxElement[]
  }
  workspace: WorkSpaceDO
  constructor(parent: blessed.Widgets.BlessedElement) {
    this.parent = parent;
    this.workspace = data;
  }

  render() {

  }
}