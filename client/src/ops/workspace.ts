import fm from '../utils/file';

export const list = async () => {
  // await fm.readWorkspace()
}

// 创建workspace
export const create = async (wname: string) => {
  await fm.writeWorkspace(wname, {});
}

// 完成workspace
export const achive = (wname: string) => {

}