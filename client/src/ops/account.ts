import { account, ifContinue } from '../utils/ask';
import { set, get } from './config';
import { user as renderUser, userExist as renderenderUserExist } from '../utils/render';
import { create as createUser, userByHash } from './user';

export const create = async () => {
  let userHash = await get('account');
  if (userHash) {
    const user = await userByHash(userHash);
    if (user) {
      renderenderUserExist(user);
      const { continue: $continue } = await ifContinue();
      if (!$continue) return;
    }
  }
  const { username, email } = await account();
  const result = await createUser({
    username, email,
  })
  set('account', result.hash || '');
  renderUser(result);
}