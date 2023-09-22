export class RegisterUserDto implements IRegisterUser {
  constructor(
    public logIn: string,
    public password: string,
    public email: string,
    public balance: number = 100,
  ) {}
}
interface IRegisterUser {
  logIn: string;
  password: string;
  email: string;
  balance?: number;
}
