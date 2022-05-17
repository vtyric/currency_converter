import { IUser } from '../../shared/interfaces';

export interface IComment {
    user: IUser,
    text: string,
    creationDate: Date,
}