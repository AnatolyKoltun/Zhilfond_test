import { User } from '../Features/Users/types';

// eslint-disable-next-line import/prefer-default-export
export const fetchUsers = async (req: string): Promise<User[]> => {
  const res = await fetch(`${req}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};
