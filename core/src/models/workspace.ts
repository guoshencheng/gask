import { ModelOp } from './helpers'

export class WorkspaceModel {
  id?: string;
  title?: string;
  description?: string;
}

export type WorkspaceDBOp = ModelOp<WorkspaceModel>