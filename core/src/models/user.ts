import { ModelOp } from './helpers'

export class UserModel {
  id?: string;
  title?: string;
  description?: string;
}

export type UserDBOp = ModelOp<UserModel>