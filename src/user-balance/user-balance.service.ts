import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserBalance } from './user-balanceDto';
import { CreateUserBalanceDto } from './user-balanceDto/create-user-balance.dto';

@Injectable()
export class UserBalanceService {
  userBalance: IUserBalance[] = [];
  addBalance(userId: string) {
    const balance = {
      ...new CreateUserBalanceDto(),
      userId: userId,
    };
    this.userBalance.push(balance);
    return userId;
  }
  subtractFromBalance(userId: string, fee: number) {
    const [balance, _] = this.findBalanceIndex(userId);
    if (balance.balance < fee) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }
    balance.balance = balance.balance - fee;
  }
  private findBalanceIndex(userId: string): [IUserBalance, number] {
    const balanceIndex = this.userBalance.findIndex(
      (balance) => balance.userId === userId,
    );
    if (!balanceIndex) throw new NotFoundException('could not find balance');
    const userBalance = this.userBalance[balanceIndex];
    return [userBalance, balanceIndex];
  }
}
