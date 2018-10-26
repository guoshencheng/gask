import { Model, ModelT } from '../utils/file';

export class WorkSpaceT extends ModelT {
  name: string;
}

const WorkSpace = new Model<WorkSpaceT>('workspaces');

export const list = async () => {
  const workspaces = await WorkSpace.findAll()
  if (workspaces && workspaces.length > 0) {
    workspaces.forEach(workspace => {
      console.log(workspace.name);
    });
  } else {
    console.log('no workspace, please create')
  }
}

// 创建workspace
export const create = async (wname: string) => {
  const workspace = await WorkSpace.create({
    name: wname
  });
  return workspace;
}

// 完成workspace
export const achive = (wname: string) => {

}