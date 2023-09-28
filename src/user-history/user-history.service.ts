import { Injectable, NotFoundException } from '@nestjs/common';
import { IcheckedOutCar } from './user-historyDto';
import { CheckidInCar, checkedOutCar } from 'src/car/carDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserHistoryService {
  constructor(private prisma: PrismaService) {}
  async createHisory(
    body: CheckidInCar,
    price: number,
  ): Promise<IcheckedOutCar> {
    console.log(body);

    const checkoutTime = new Date();
    const fee =
      ((checkoutTime.getTime() - body.checkInTime.getTime()) /
        (1000 * 60 * 60)) *
      price;
    const { carParkedId, ...rest } = body;
    const carParcked = await this.prisma.parkingHistory.create({
      data: {
        ...rest,
        checkOutTime: checkoutTime,
        fee: fee,
      },
    });
    return carParcked;
  }
  async getHistoryByLot(lotId: string) {
    try {
      const carParcked = await this.prisma.parkingHistory.findMany({
        where: {
          parkingId: lotId,
        },
      });
      return carParcked;
    } catch (error) {
      throw error;
    }
  }
  async getHistoryByUserId(userId: string) {
    try {
      const carParcked = await this.prisma.parkingHistory.findMany({
        where: {
          userId,
        },
      });
      return carParcked;
    } catch (error) {
      throw error;
    }
  }
}
