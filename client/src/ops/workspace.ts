import fm from '../utils/file';
import { generate } from 'shortid'
import { current } from '../utils/date';

export const list = async () => {
  const workspaces = await fm.readWorkSpaceJson();
  if (workspaces && workspaces.length > 0) {
    workspaces.forEach(workspace => {
      console.log(workspace);
    });
  } else {
    console.log('no workspace, please create')
  }
}

// 创建workspace
export const create = async (wname: string) => {
  const workspaces = await fm.readWorkSpaceJson();
  const hash = generate();
  const next = workspaces.concat({
    members: [],
    lists: [],
    hash,
    name: wname,
    createdAt: current(),
    updatedAt: current(),
  })
  await fm.writeWorkSpaceJson(next);
  await fm.writeWorkspace(wname, {});
}

// 完成workspace
export const achive = (wname: string) => {

}