import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserHistory } from './user-historyDto';
import { CreateUserHistoryDto } from './user-historyDto/create-user-history.dto';
import { checkedOutCar } from 'src/car/carDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserHistoryService {
  // constructor(private prisma: PrismaService) {}
  // async createHisory(
  //   parkingId: string,
  //   carId: string,
  //   userId: string,
  //   price: number,
  // ){
  //   const carParcked = await this.prisma.carParked.create({
  //     data: {
  //       parkingId,
  //       carId: carId,
  //       userId: userId,
  //       checkInTime: new Date(),
  //     },
  //   });
  //   return [carParcked, price];
  // }
  // async getParckedCarsByLot(lotId: string){
  //   const carParcked = await this.prisma.carParked.findMany({
  //     where: {
  //       parkingId: lotId,
  //     },
  //   });
  //   return carParcked;
  // }
}
