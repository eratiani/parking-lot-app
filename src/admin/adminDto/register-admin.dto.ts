export class RegisterAdminDto implements IRegisterAdmin {
  constructor(
    public logIn: string,
    public password: string,
    public email: string,
    public balance: number = 100,
  ) {}
}
interface IRegisterAdmin {
  logIn: string;
  password: string;
  email: string;
  balance?: number;
}
