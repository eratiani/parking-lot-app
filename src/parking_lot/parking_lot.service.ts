import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { CreateParkingLotDto, Iparking } from './parking_lotDto';
import { checkedInCar, checkedOutCar } from 'src/car/carDto/car.interface';

@Injectable()
export class ParkingLotService {
  constructor(private readonly prisma: PrismaService) {}

  async addParkingLot(
    parkingLot: CreateParkingLotDto,
  ): Promise<CreateParkingLotDto> {
    try {
      const parkingLotId: string = uuidv4();
      const newParkingLot = {
        parkingId: parkingLotId,
        ...parkingLot,
      };

      await this.prisma.parkingLot.create({
        data: newParkingLot,
      });

      return newParkingLot;
    } catch (error) {
      throw error;
    }
  }

  async getParkingLots(): Promise<CreateParkingLotDto[]> {
    try {
      return await this.prisma.parkingLot.findMany({
        include: {
          parkingHistory: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getParkingLot(id: string): Promise<CreateParkingLotDto> {
    const parkingLot = await this.prisma.parkingLot.findUnique({
      where: { parkingId: id },
      include: {
        parkingHistory: true,
        carParked: true,
      },
    });

    if (!parkingLot) {
      throw new NotFoundException('Parking lot not found');
    }

    return parkingLot;
  }

  async updateParkingLot(id: string, body: CreateParkingLotDto): Promise<void> {
    try {
      await this.getParkingLot(id);

      await this.prisma.parkingLot.update({
        where: { parkingId: id },
        data: body,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteParkingLot(id: string): Promise<void> {
    try {
      await this.getParkingLot(id);

      await this.prisma.parkingLot.delete({
        where: { parkingId: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
