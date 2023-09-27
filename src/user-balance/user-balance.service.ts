import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserBalance } from './user-balanceDto';
import { CreateUserBalanceDto } from './user-balanceDto/create-user-balance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserBalanceService {
  constructor(public readonly prismaService: PrismaService) {}
  async addBalance(userId: string) {
    const balance = {
      ...new CreateUserBalanceDto(),
      userId: userId,
    };
    await this.prismaService.balance.create({
      data: balance,
    });

    return userId;
  }
  async subtractFromBalance(userId: string, fee: number) {
    try {
      const balance: number = await this.getBalance(userId);
      const newBalance = balance - fee;
      if (newBalance < 0) {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
      }
      await this.prismaService.balance.update({
        where: { userId: userId },
        data: {
          balance: newBalance,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  private async getBalance(userId: string) {
    const balance = await this.prismaService.balance.findUnique({
      where: { userId: userId },
    });
    if (!balance) throw new NotFoundException('could not find balance');

    return balance.balance;
  }
}
