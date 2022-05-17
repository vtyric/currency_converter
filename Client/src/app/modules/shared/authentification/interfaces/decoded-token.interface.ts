export interface IDecodedToken {
  aud: string;
  exp: number;
  id: string;
  iss: string;
  login: string;
  role: 'User' | 'Admin'; // Можно же типизировать, как Role
}
