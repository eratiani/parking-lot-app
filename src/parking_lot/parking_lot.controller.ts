import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParkingLotService } from './parking_lot.service';
import { CreateParkingLotDto, Iparking } from './parking_lotDto';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
import { throwCustomError } from 'src/utility/custom.error';
import { ICar, checkedInCar } from 'src/car/carDto/car.interface';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(public readonly parkingLotService: ParkingLotService) {}
  @Post()
  addParkingLot(@Body() body: CreateParkingLotDto) {
    throwCustomError(body, 'lotName', 'string');
    throwCustomError(body, 'lotAdress', 'string');
    throwCustomError(body, 'parkingPrice', 'number');
    checkAllowedFields(['lotName', 'lotAdress', 'parkingPrice'], body);
    this.parkingLotService.checkForUnique(body.lotName, body.lotAdress);
    this.parkingLotService.addParkingLot(body);
  }
  @Get()
  getParkingLots() {
    return this.parkingLotService.getParkingLots();
  }
  @Get(':id')
  getParkingLot(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    return this.parkingLotService.getParkingLot(id);
  }
  @Patch(':id')
  updateParkingLot(@Param('id') id: string, @Body() body: Iparking) {
    throwCustomError(body, 'lotName', 'string');
    throwCustomError(body, 'lotAdress', 'string');
    throwCustomError(body, 'parkingPrice', 'number');
    this.parkingLotService.checkForUnique(body.lotName, body.lotAdress);
    checkAllowedFields(
      ['lotName', 'lotAdress', 'parkingPrice', 'parkingHistory', 'id'],
      body,
    );
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.parkingLotService.updateParkingLot(id, body);
    return null;
  }
  @Delete(':id')
  deleteParkingLot(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.parkingLotService.deleteParkingLot(id);
    return null;
  }
  @Post(':lotId/cars/checkin')
  checkIn(@Body() body: ICar, @Param('lotId') lotId: string) {
    throwCustomError(body, 'carModel', 'string');
    throwCustomError(body, 'carNumber', 'string');
    throwCustomError(body, 'carType', 'string');
    throwCustomError(body, 'userId', 'string');
    throwCustomError(body, 'carId', 'string');
    checkAllowedFields(
      ['carModel', 'carNumber', 'carType', 'userId', 'carId'],
      body,
    );
    this.parkingLotService.checkIn(body, lotId);
    return null;
  }
  @Post(':lotId/cars/:carId/checkout')
  checkOut(@Param('lotId') lotId: string, @Param('carId') carId: string) {
    this.parkingLotService.checkOut(lotId, carId);
    return null;
  }
  @Get(':lotId/history')
  getExpiredHistory(@Param('lotId') lotId: string) {
    return this.parkingLotService.getexpiredParkingHistory(lotId);
  }
  @Get(':lotId/currCars')
  getCurrCars(@Param('lotId') lotId: string) {
    return this.parkingLotService.getCurrParkingHistory(lotId);
  }
}
