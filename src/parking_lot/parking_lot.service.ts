import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateParkingLotDto } from './parking_lotDto';
import { ICar } from 'src/car/carDto/car.interface';
import { ParckedCarService } from 'src/parcked-car/parcked-car.service';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { UserHistoryService } from 'src/user-history/user-history.service';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly prisma: PrismaService,
    public carParkedService: ParckedCarService,
    public balanceServ: UserBalanceService,
    public userHistoryService: UserHistoryService,
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
    const userHistory = await this.userHistoryService.createHisory(
      checkedOutCar,
      price,
    );
    const fee = userHistory.fee;
    await this.balanceServ.subtractFromBalance(checkedOutCar.userId, fee);
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
