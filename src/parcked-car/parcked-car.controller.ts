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
import { ParckedCarService } from './parcked-car.service';
import { CreateParkingLotDto } from 'src/parking_lot/parking_lotDto';
import { CreateParckedCarDto } from './parcked-car.dto/parcked-car.dto';
import { ICar } from 'src/car/carDto';
import { ICreateParckedCar } from './parcked-car.dto/create-parcked-car.interface';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
import { throwCustomError } from 'src/utility/custom.error';

@Controller('parcked-car')
export class ParckedCarController {
  constructor(public readonly parckedCarService: ParckedCarService) {}

  @Get(':lotid')
  async getParckedCarsByLot(@Param('lotid') lotid: string) {
    if (!lotid || typeof lotid !== 'string') {
      throw new BadRequestException('Invalid request id');
    }

    try {
      return await this.parckedCarService.getParckedCarsByLot(lotid);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async removeCarParked(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }

    try {
      return await this.parckedCarService.removeCarParked(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
