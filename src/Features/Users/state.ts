import { User } from './types';

export type State = {
  users: User[] | undefined;
  error: string | undefined;
};
