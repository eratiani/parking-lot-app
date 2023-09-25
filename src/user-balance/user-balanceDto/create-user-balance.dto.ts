import { ICreateUserBalance } from './user-balance.interface';

export class CreateUserBalanceDto implements ICreateUserBalance {
  constructor(public balance: number = 100) {}
}
