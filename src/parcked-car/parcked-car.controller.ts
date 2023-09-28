import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
} from '@nestjs/common';

import { ParckedCarService } from './parcked-car.service';

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
