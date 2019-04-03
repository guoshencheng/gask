import { ModelOp } from './helpers'

export class WorkspaceModel {
  id?: string;
  title?: string;
  ownerId?: string;
  description?: string;
}

export type WorkspaceDBOp = ModelOp<WorkspaceModel>