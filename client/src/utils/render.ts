import { UserT } from '../ops/user';
import { WorkSpaceT } from '../ops/workspace';
import chalk from 'chalk'

export const user = (u: UserT) => {
  console.log(`username: ${u.username}`);
  console.log(`email : ${u.email}`);
  console.log(`hash: ${u.hash}`);
}

export const userExist = (u: UserT) => {
  console.log(`${chalk.red('用户已经存在')}`);
  console.log(`username: ${u.username}`);
  console.log(`email : ${u.email}`);
  console.log(`hash: ${u.hash}`);
}

export const workspace = (w: WorkSpaceT, owner: UserT) => {
  console.log(chalk.green('Workspace: '))
  console.log(`  workspace name: ${w.name}`);
  console.log(`  hash: ${w.hash}`);
  console.log(`  owner: ${owner.username}`);
}

export const workspaces = (ws?: WorkSpaceT[]) => {
  if (ws && ws.length > 0) {
    console.log(chalk.green('Workspace list: '))
    ws.forEach((w, index) => {
      console.log(`${index + 1}. ${w.name}`);
    });
  } else {
    console.log('no workspace, please create')
  }
}