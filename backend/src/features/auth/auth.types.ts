export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'manager' | 'accountant' | 'employee';
  image?: string;
  salary?: number;
}