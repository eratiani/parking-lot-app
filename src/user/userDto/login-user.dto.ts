export class LogInUserDto implements ILogInUser {
  constructor(
    public logIn: string,
    public password: string,
  ) {}
}
export interface ILogInUser {
  logIn: string;
  password: string;
}
