export interface IUsersData {
  name: string;
  id: string;
  surName: string;
  email: string;
  fullName: string;
  password: string;
  telephone?: string;
  birthDate?: Date;
  employment?: string;
  userAgreement?: boolean;
}

export type TUsersCreateRequest = Omit<IUsersData, 'id'>;

export interface IUserCreateResponse {
  id: string;
  name: string;
}
