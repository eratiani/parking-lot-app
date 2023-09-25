export interface ICreateUserBalance {
  balance: number;
}
export interface IUserBalance extends ICreateUserBalance {
  userId: string;
}
