import { Role } from '../../authentification/enums';

export interface IUser {
  id: number,
  login: string,
  role: Role,
  lastName: string,
  firstName: string,
  middleName: string,
  email: string;
}
