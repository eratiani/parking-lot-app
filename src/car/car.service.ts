import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCarDto, ICar } from './carDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}

  async addCar(userId: string, car: CreateCarDto) {
    return await this.prisma.car.create({
      data: {
        carModel: car.carModel,
        carNumber: car.carNumber,
        carType: car.carType,
        userId: userId,
      },
    });
  }

  async getCars(userId: string) {
    return await this.prisma.car.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getCar(carId: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        carId: carId,
      },
    });
    if (car === null) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  async updateCar(carId: string, body: ICar) {
    const car = await this.prisma.car.update({
      where: {
        carId: carId,
      },
      data: {
        carModel: body.carModel,
        carNumber: body.carNumber,
        carType: body.carType,
      },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
  }

  async deleteCar(userId: string, carId: string) {
    const car = await this.prisma.car.delete({
      where: {
        carId: carId,
      },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
  }
}
