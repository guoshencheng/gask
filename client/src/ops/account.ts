import { account, ifContinue, suggestToCreateAccount } from '../utils/ask';
import { set, get } from './config';
import { user as renderUser, userExist as renderenderUserExist } from '../utils/render';
import { create as createUser, userByHash, UserT } from './user';

export const getAccount = async (): Promise<UserT|undefined> => {
  let userHash = await get('account');
  if (userHash) {
    const user = await userByHash(userHash);
    return user;
  }
}

export const create = async () => {
  const user = await getAccount();
  if (user) {
    renderenderUserExist(user);
    const { continue: $continue } = await ifContinue();
    if (!$continue) return user;
  }
  const { username, email } = await account();
  const result = await createUser({
    username, email,
  })
  set('account', result.hash || '');
  renderUser(result);
  return result;
}

export const info = async () => {
  const user = await getAccount();
  if (user) {
    renderUser(user)
  } else {
    const { create: $create } = await suggestToCreateAccount();
    if ($create) {
      create();
    }
  }
}