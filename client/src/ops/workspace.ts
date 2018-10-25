import fm from '../utils/file';

export const list = async () => {
  const workspaces = await fm.listWorkSpace();
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
  await fm.createWorkspace(wname);
}

// 完成workspace
export const achive = (wname: string) => {

}