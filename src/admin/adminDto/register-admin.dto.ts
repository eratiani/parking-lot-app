export class RegisterAdminDto implements IRegisterAdmin {
  constructor(
    public logIn: string,
    public password: string,
    public email: string,
  ) {}
}
interface IRegisterAdmin {
  logIn: string;
  password: string;
  email: string;
}
