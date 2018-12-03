import { TaskDBOp } from './task';
import { TopicDBOp } from './topic';
import { UserDBOp } from './user';
import { WorkspaceDBOp } from './workspace';

export type DBOps = {
  task: TaskDBOp,
  topic: TopicDBOp,
  user: UserDBOp,
  workspace: WorkspaceDBOp,
}


class App {
  dbops: DBOps
  constructor(dbops: DBOps) {
    this.dbops = dbops;
  }
  createWorspace() {
    
  }
}

export default App;