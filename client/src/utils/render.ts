import { UserT } from '../ops/user';
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