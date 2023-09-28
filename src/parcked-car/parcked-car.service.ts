import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParckedCarDto } from './parcked-car.dto/parcked-car.dto';
import { CheckidInCar } from 'src/car/carDto';
import { ICarParked } from 'src/parking_lot/parking_lotDto';

@Injectable()
export class ParckedCarService {
  constructor(public readonly prisma: PrismaService) {}
  async checkIn(
    parkingId: string,
    carId: string,
    userId: string,
    price: number,
  ): Promise<[ICarParked, number]> {
    const carParcked = await this.prisma.carParked.create({
      data: {
        parkingId,
        carId: carId,
        userId: userId,
        checkInTime: new Date(),
      },
    });
    return [carParcked, price];
  }
  async getParckedCarsByLot(lotId: string): Promise<ICarParked[]> {
    const carParcked = await this.prisma.carParked.findMany({
      where: {
        parkingId: lotId,
      },
    });

    return carParcked;
  }

  async removeCarParked(carParkedId: string): Promise<CheckidInCar> {
    const car = await this.prisma.carParked.delete({
      where: {
        carParkedId,
      },
    });
    return car;
  }
}
