import { Model, ModelT } from '../utils/file';
import { suggestToCreateAccount, chooseWorkspace } from '../utils/ask'
import { getAccount, create as createAccount } from './account';
import { workspace as renderWorkspace, workspaces as renderWorkspaces } from '../utils/render';
import { set, get } from './config';

export class WorkSpaceT extends ModelT {
  name: string;
  owner?: string;
  topics?: string[];
}

export const CURRENT_WORKSPACE_KEY = 'workspace';

const WorkSpace = new Model<WorkSpaceT>('workspaces');

export const current = async () => {
  const hash = await get(CURRENT_WORKSPACE_KEY);
  const workspace = await WorkSpace.findByHash(hash);
  return workspace;
}

export const checkout = async () => {
  const workspace = await choose();
  await set(CURRENT_WORKSPACE_KEY, workspace.hash as string);
  console.log(`current workspace ${workspace.name}`);
}

export const save = async (workspace: WorkSpaceT) => {
  return WorkSpace.save(workspace);
}

export const list = async () => {
  const workspaces = await WorkSpace.findAll()
  renderWorkspaces(workspaces);
};

export const choose = async () => {
  const workspaces = await WorkSpace.findAll()
  const { workspace } = await chooseWorkspace(workspaces);
  return workspace;
}

export const findByHash = async (hash: string) => {
  const workspace = await WorkSpace.findByHash(hash);
  return workspace;
}

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