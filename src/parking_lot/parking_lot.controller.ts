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
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
@Controller('parking-lot')
export class ParkingLotController {
  constructor(public readonly parkingLotService: ParkingLotService) {}

  @Post()
  async addParkingLot(@Body() body: CreateParkingLotDto) {
    try {
      throwCustomError(body, 'lotName', 'string');
      throwCustomError(body, 'lotAddress', 'string');
      throwCustomError(body, 'parkingPrice', 'number');
      checkAllowedFields(['lotName', 'lotAddress', 'parkingPrice'], body);
      const parkingLotId = await this.parkingLotService.addParkingLot(body);
      return { message: 'Parking lot created successfully', parkingLotId };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getParkingLots() {
    return await this.parkingLotService.getParkingLots();
  }

  @Get(':id')
  async getParkingLot(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }

    try {
      return await this.parkingLotService.getParkingLot(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateParkingLot(
    @Param('id') id: string,
    @Body() body: CreateParkingLotDto,
  ) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }

    try {
      throwCustomError(body, 'lotName', 'string');
      throwCustomError(body, 'lotAddress', 'string');
      throwCustomError(body, 'parkingPrice', 'number');
      checkAllowedFields(['lotName', 'lotAddress', 'parkingPrice'], body);

      await this.parkingLotService.updateParkingLot(id, body);
      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteParkingLot(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }

    try {
      await this.parkingLotService.deleteParkingLot(id);
      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
