export class LogInAdminDto implements ILogInAdmin {
  constructor(
    public logIn: string,
    public password: string,
  ) {}
}
interface ILogInAdmin {
  logIn: string;
  password: string;
}
