import { Role } from '../enums';

export interface IDecodedToken {
    aud: string;
    exp: number;
    id: string;
    iss: string;
    login: string;
    role: Role;
}
