import { account } from '../utils/ask';
import { create as createUser } from './user';

export const create = async () => {
  const { username, email } = await account();
  const result = await createUser({
    username, email,
  })
  console.log(result);
}