import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParckedCarDto } from './parcked-car.dto/parcked-car.dto';
import { ParkingLotService } from 'src/parking_lot/parking_lot.service';

@Injectable()
export class ParckedCarService {
  constructor(
    public readonly prisma: PrismaService,
    public parkLotServ: ParkingLotService,
  ) {}
  async checkIn(parkingId: string, carId: string): Promise<[string, number]> {
    console.log(carId);
    const fee = await (
      await this.parkLotServ.getParkingLot(parkingId)
    ).parkingPrice;
    const carParcked = await this.prisma.carParked.create({
      data: {
        parkingId,
        carId: carId,
        checkInTime: new Date(),
      },
    });
    return [carParcked.carParkedId, fee];
  }
  async getParckedCarsByLot(lotId: string): Promise<CreateParckedCarDto[]> {
    const carParcked = await this.prisma.carParked.findMany({
      where: {
        parkingId: lotId,
      },
    });

    return carParcked;
  }

  async removeCarParked(carParkedId: string): Promise<Date> {
    const car = await this.prisma.carParked.delete({
      where: {
        carParkedId,
      },
    });
    return car.checkInTime;
  }
}
