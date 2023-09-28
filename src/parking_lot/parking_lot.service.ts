import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { CreateParkingLotDto, Iparking } from './parking_lotDto';
import {
  ICar,
  checkedInCar,
  checkedOutCar,
} from 'src/car/carDto/car.interface';
import { ParckedCarService } from 'src/parcked-car/parcked-car.service';
import { UserBalanceService } from 'src/user-balance/user-balance.service';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly prisma: PrismaService,
    public carParkedService: ParckedCarService,
    public balanceServ: UserBalanceService,
  ) {}

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
  async checkIn(body: ICar, lotId: string) {
    const lot = await this.getParkingLot(lotId);
    return await this.carParkedService.checkIn(
      lotId,
      body.carId,
      body.userId,
      lot.parkingPrice,
    );
  }
  async checkOut(carParckedId: string, price: number) {
    const checkedOutCar =
      await this.carParkedService.removeCarParked(carParckedId);
    // const userHistory = await
    // const fee = checkedOutCar.checkInTime
    // await this.balanceServ.subtractFromBalance(checkedOutCar.userId,price*checkedOutCar.)
    return checkedOutCar;
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
