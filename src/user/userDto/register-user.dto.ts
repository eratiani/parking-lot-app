import { ICar } from 'src/car/carDto';

export class RegisterUserDto implements IRegisterUser {
  constructor(
    public logIn: string,
    public password: string,
    public email: string,

    public cars: ICar[] = [],
  ) {}
}
interface IRegisterUser {
  logIn: string;
  password: string;
  email: string;

  cars?: ICar[];
}
