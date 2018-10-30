import { Model, ModelT } from '../utils/file';

export class UserT extends ModelT {
  username: string;
  email: string
}

const User = new Model<UserT>('users');

// 创建
export const create = async ({ username, email }: UserT) => {
  const user = await User.create({
    username, email,
  });
  return user;
}

// 移除用户
export const remove = async (email: string) => {
  const users = await User.findAll();
  const user = users.filter(u => u.email === email)[0];
  if (user && user.hash) {
    User.delByHash(user.hash);
  } else {
    console.log(`no user was found`);
  }
}

// 用户列表
export const users = async () => {
  const users = await User.findAll();
  if (users && users.length > 0) {
    users.forEach(user => {
      console.log(`${user.username}  ${user.email}`);
    });
  } else {
    console.log('no user, please create')
  }
}

export const userByHash = async (hash: string) => {
  const user = await User.findByHash(hash);
  return user;
}