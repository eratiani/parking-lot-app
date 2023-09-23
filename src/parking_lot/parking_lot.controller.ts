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

@Controller('parking-lot')
export class ParkingLotController {
  constructor(public readonly parkingLotService: ParkingLotService) {}
  @Post()
  createUser(@Body() body: CreateParkingLotDto) {
    throwCustomError(body, 'lotName', 'string');
    throwCustomError(body, 'lotAdress', 'string');
    throwCustomError(body, 'parkingPrice', 'number');
    checkAllowedFields(['lotName', 'lotAdress', 'parkingPrice'], body);
    this.parkingLotService.addParkingLot(body);
  }
  @Get()
  getUsers() {
    return this.parkingLotService.getParkingLots();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    return this.parkingLotService.getParkingLot(id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: Iparking) {
    throwCustomError(body, 'lotName', 'string');
    throwCustomError(body, 'lotAdress', 'string');
    throwCustomError(body, 'parkingPrice', 'number');
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
  deleteUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.parkingLotService.deleteParkingLot(id);
    return null;
  }
}
