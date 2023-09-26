import { ICar } from 'src/car/carDto';

export interface IUser {
  id: string;
  logIn: string;
  password: string;
  email: string;

  cars?: ICar[];
}
