export class IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  auth: UserAuth;
  birthdate: Date;
}

export interface UserAuth {
  membership?: Date;
  lastLogin?: Date
  role: 'Admin' | 'User';
}

export interface UserDataSafe {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate: Date
}
