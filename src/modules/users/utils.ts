import { IUsersData } from './users.interface';

export const findUserByEmail = (
  db: Record<string, IUsersData>,
  email: string,
): IUsersData | undefined => {
  return Object.values(db).find(
    ({ email: existingEmail }) => existingEmail === email,
  );
};
