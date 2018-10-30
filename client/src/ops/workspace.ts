import { Model, ModelT } from '../utils/file';
import { suggestToCreateAccount } from '../utils/ask'
import { getAccount, create as createAccount } from './account';
import { workspace as renderWorkspace, workspaces as renderWorkspaces } from '../utils/render';

export class WorkSpaceT extends ModelT {
  name: string;
  owner?: string;
}

const WorkSpace = new Model<WorkSpaceT>('workspaces');

export const list = async () => {
  const workspaces = await WorkSpace.findAll()
  renderWorkspaces(workspaces);
};

// 创建workspace
export const create = async (wname: string) => {
  let account = await getAccount();
  if (!account) {
    const { create } = await suggestToCreateAccount();
    if (!create) return;
    account = await createAccount();
  }
  const workspace = await WorkSpace.create({
    name: wname,
    owner: account.hash,
  });
  renderWorkspace(workspace, account);
  return workspace;
};

// 完成workspace
export const achive = (wname: string) => {

}